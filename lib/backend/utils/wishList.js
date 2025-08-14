import userModel from "@/models/user";
import courseModel from "@/models/course";
import wishListModel from "@/models/wishList";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

const addToWishList = async (body) => {
  const { user, course } = body;

  const isUserAvaible = await isAvailable(user, userModel);
  const isCourseAvaible = await isAvailable(course, courseModel);
  if (!isUserAvaible || !isCourseAvaible) {
    return NextResponse.json(
      { message: "user or course is not found" },
      { status: 404 }
    );
  }

  const checkWishList = await wishListModel.findOne({ course, user });

  if (checkWishList) {
    return Response.json(
      { message: "This Course Exist already" },
      { status: 422 }
    );
  }

  const wishList = await wishListModel.create({ user, course });

  return Response.json(
    { message: "course create successfully", wishList },
    { status: 200 }
  );
};

const removeWishList = async (courseID, userID) => {
  const wishList = await wishListModel.findOne({
    user: userID,
    course: courseID,
  });

  if (!wishList) {
    return NextResponse.json({ message: "course not found" }, { status: 404 });
  }

  await wishListModel.findOneAndDelete({
    user: userID,
    course: courseID,
  });

  return NextResponse.json({ message: "course deleted" }, { status: 200 });
};

const getWishlist = async (userID) => {
  const resWishList = await wishListModel
    .find({ user: userID }, "-user")
    .populate("course", "title description coverImage");
  return JSON.parse(JSON.stringify(resWishList));
};

export { addToWishList, removeWishList, getWishlist };
