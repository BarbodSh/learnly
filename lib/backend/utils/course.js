import courseModel from "@/models/course";
import categoryModel from "@/models/category";
import userModel from "@/models/user";
import wishlistModel from "@/models/wishList";
import { isAvailable } from "./helper";
import mongoose from "mongoose";
import { validateCourse } from "@/lib/validator/course";
import { NextResponse } from "next/server";
import { validateID } from "@/lib/validator/helper";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/liaraS3";

export const createCourse = async (formData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const coverImage = formData.get("coverImage");
  const price = formData.get("price");
  const isFree = formData.get("isFree");
  const support = formData.get("support");
  const category = formData.get("category");
  const teacher = formData.get("teacher");

  const validate = validateCourse({
    title,
    description,
    coverImage,
    price,
    isFree,
    support,
    category,
    teacher,
  });

  const validateCategoryId = validateID(category);
  const validateTeacherId = validateID(teacher);

  if (validate !== true || !validateCategoryId || !validateTeacherId) {
    return NextResponse.json({ message: "data is not valid" }, { status: 400 });
  }

  const isAvaibleCategory = isAvailable(category, categoryModel);
  const isAvaibleTeacher = isAvailable(teacher, userModel);
  if (!isAvaibleCategory || !isAvaibleTeacher) {
    return NextResponse.json(
      { message: "urser or data not found" },
      { status: 404 }
    );
  }

  const buffer = Buffer.from(await coverImage.arrayBuffer());

  const fileName = Date.now() + "-" + coverImage.name;
  const command = new PutObjectCommand({
    Bucket: process.env.LIARA_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: coverImage.type,
  });

  try {
    await s3.send(command);
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { message: "Upload failed", error },
      { status: 500 }
    );
  }
  const uploadedFileUrl = `https://${process.env.LIARA_BUCKET_NAME}.storage.c2.liara.space/${fileName}`;
  console.log(uploadedFileUrl);
  const course = await courseModel.create({
    title,
    description,
    coverImage: uploadedFileUrl,
    price,
    isFree,
    support,
    category,
    teacher,
  });

  await categoryModel.findOneAndUpdate(
    { _id: category },
    {
      $push: { course: course._id },
    }
  );

  return NextResponse.json(
    { message: "course create successfully", course },
    { status: 201 }
  );
};

export const removeCourse = async (courseID) => {
  if (!mongoose.Types.ObjectId.isValid(courseID)) {
    return Response.json({ message: "data is not valid" }, { status: 422 });
  }

  const isAvaibleCourse = await isAvailable(courseID, courseModel);
  if (!isAvaibleCourse) {
    return Response.json({ message: "course is not found" }, { status: 404 });
  }

  const isAvaibleCategory = await isAvailable(
    isAvaibleCourse.category,
    categoryModel
  );

  if (!isAvaibleCategory) {
    const course = await courseModel.findOneAndDelete({ _id: courseID });
    return Response.json(
      { message: "course remove is successfully" },
      { status: 200 }
    );
  }

  const deleteFromCategoty = await categoryModel.findOneAndUpdate(
    { _id: isAvaibleCourse.category },
    { $pull: { course: courseID } }
  );

  await wishlistModel.deleteMany({ course: courseID });

  const course = await courseModel.findOneAndDelete({ _id: courseID });

  return Response.json(
    { message: "course remove is successfully" },
    { status: 200 }
  );
};

export const getCourseForAdmin = async () => {
  const resCourses = await courseModel
    .find({})
    .populate("teacher", "username")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resCourses));
};
