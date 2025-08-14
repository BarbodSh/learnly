import courseModel from "@/models/course";
import lessonModel from "@/models/lesson";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

export const createLesson = async (body) => {
  const { title, courseID, isFree } = body;

  const isAvailableCourse = await isAvailable(courseID, courseModel);
  if (!isAvailableCourse) {
    return NextResponse.json(
      { message: "course is not found" },
      { status: 404 }
    );
  }

  const lesson = await lessonModel.create({
    title,
    course: courseID,
    isFree,
  });

  const updateCourse = await courseModel.findOneAndUpdate(
    { _id: courseID },
    {
      $push: { lesson: lesson._id },
    }
  );

  return NextResponse.json(
    { message: "lesson create successfully" },
    { status: 201 }
  );
};

export const removeLesson = async (lessonID) => {
  const isAvailableLesson = await isAvailable(lessonID, lessonModel);
  if (!isAvailableLesson) {
    return NextResponse.json(
      { message: "lesson is not found" },
      { status: 404 }
    );
  }

  const updateCourse = await courseModel.findOneAndUpdate(
    { _id: isAvailableLesson.course },
    {
      $pull: { lesson: lessonID },
    }
  );
  const lesson = await lessonModel.findOneAndDelete({ _id: lessonID });
  return NextResponse.json(
    { message: "lesson rmeove successfully" },
    { status: 200 }
  );
};

export const getLesson = async () => {
  const resLesson = await lessonModel
    .find({})
    .populate("course", "title")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resLesson));
};
