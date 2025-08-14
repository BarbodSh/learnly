import commentModel from "@/models/comment";
import courseModel from "@/models/course";
import userModel from "@/models/user";
import mongoose from "mongoose";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

export const createComment = async (body) => {
  const { text, username, score, course } = body;

  const userIsAvailble = await isAvailable(username, userModel);
  const courseIsAvaible = await isAvailable(course, courseModel);

  if (!userIsAvailble || !courseIsAvaible) {
    return NextResponse.json(
      { message: "user or course not found", course },
      { status: 404 }
    );
  }

  const isBuyCourse = await courseModel.findOne({
    _id: course,
    user: { $in: [new mongoose.Types.ObjectId(username)] },
  });

  if (!isBuyCourse) {
    return NextResponse.json(
      { message: "user don't have buy this course", course },
      { status: 422 }
    );
  }

  const comment = await commentModel.create({
    text,
    username,
    score,
    course,
  });

  const res = await courseModel.findOneAndUpdate(
    { _id: course },
    {
      $push: { comments: comment._id },
    }
  );

  return NextResponse.json(
    { message: "comment create successfully" },
    { status: 201 }
  );
};

export const removeComment = async (commentID) => {
  const checkComment = await isAvailable(commentID, commentModel);
  if (!checkComment) {
    return NextResponse.json({ message: "comment not found" }, { status: 404 });
  }

  const comment = await commentModel.findOneAndDelete({ _id: commentID });

  return NextResponse.json(
    { message: "comment remove is successfully" },
    { status: 200 }
  );
};

export const answerComment = async (body) => {
  const { commentID, responder, textresponse } = body;

  const isAvaibleComment = await isAvailable(commentID, commentModel);
  if (!isAvaibleComment) {
    return NextResponse.json({ message: "comment not found" }, { status: 404 });
  }

  const comment = await commentModel.findOneAndUpdate(
    { _id: commentID },
    {
      responder,
      textresponse,
      isAnswered: true,
    }
  );
  return NextResponse.json(
    { message: "comment answer is successfully" },
    { status: 200 }
  );
};

export const confirmationComment = async (commentID) => {
  const checkComment = await isAvailable(commentID, commentModel);
  if (!checkComment) {
    return Response.json({ message: "comment not found" }, { status: 404 });
  }

  const comment = await commentModel.findOneAndUpdate(
    { _id: commentID },
    {
      isShow: checkComment.isShow === false ? true : false,
    }
  );

  return Response.json(
    { message: "comment show is successfylly" },
    { status: 200 }
  );
};

export const getCommentForUser = async (userID) => {
  const resComments = await commentModel
    .find({ username: userID }, "-isAnswered")
    .populate("course", "title")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resComments));
};

export const getCommentForAdmin = async () => {
  const resComment = await commentModel
    .find({})
    .populate("username course", "username title")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resComment));
};
