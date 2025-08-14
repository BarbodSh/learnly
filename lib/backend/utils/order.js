import userModel from "@/models/user";
import courseModel from "@/models/course";
import orderModel from "@/models/order";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

const orderCourse = async (body) => {
  const { user, course, amount } = body;

  const isAvaibleUser = await isAvailable(user, userModel);
  if (!isAvaibleUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  for (const courseId of course) {
    const existingOrder = await orderModel.findOne({
      user,
      course: courseId,
    });

    const findCourse = await isAvailable(courseId, courseModel);

    if (existingOrder) {
      return NextResponse.json(
        {
          message: `course ${courseId} already ordered`,
          title: findCourse.title,
        },
        { status: 422 }
      );
    }
  }

  const order = await orderModel.create({ user, course, amount });

  for (const courseId of course) {
    await courseModel.findOneAndUpdate(
      { _id: courseId },
      { $push: { user: user } }
    );
  }

  return NextResponse.json(
    { message: "order is successfully" },
    { status: 200 }
  );
};

export const getOrderForUser = async (userID) => {
  const resOrder = await orderModel.find({ user: userID }).sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resOrder));
};

export const getCourseOrder = async (userID) => {
  const resCourseOrder = await orderModel
    .find({ user: userID })
    .populate("course")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resCourseOrder));
};

export const getOrderForAdmin = async () => {
  const resOrder = await orderModel
    .find({})
    .populate("user", "username")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resOrder));
};

export default orderCourse;
