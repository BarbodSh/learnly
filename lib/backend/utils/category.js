import categoryModel from "@/models/category";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

export const createCategory = async (body) => {
  const { title } = body;

  const categoryIsAvaible = await categoryModel.findOne({ title });
  if (categoryIsAvaible) {
    return NextResponse.json(
      { message: "category is already exist" },
      { status: 409 }
    );
  }

  const category = await categoryModel.create({
    title,
  });

  return NextResponse.json(
    { message: "coategory create successfully", category },
    { status: 201 }
  );
};

export const removeCategory = async (categoryID) => {
  const categoryIsAvaible = await isAvailable(categoryID, categoryModel);
  if (!categoryIsAvaible) {
    return NextResponse.json(
      { message: "category not found" },
      { status: 404 }
    );
  }

  const categoty = await categoryModel.findOneAndDelete({ _id: categoryID });

  return NextResponse.json(
    { message: "category remove is successfully" },
    { status: 200 }
  );
};

export const updateCategory = async (body, categoryID) => {
  const { title } = body;

  const categoryIsAvaible = await isAvailable(categoryID, categoryModel);
  if (!categoryIsAvaible) {
    return NextResponse.json(
      { message: "category not found" },
      { status: 404 }
    );
  }

  const categoty = await categoryModel.findOneAndUpdate(
    { _id: categoryID },
    { title }
  );

  return NextResponse.json(
    { message: "category update is successfully" },
    { status: 200 }
  );
};

export const getCatgory = async () => {
  const resCategories = await categoryModel.find({}).sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resCategories));
};
