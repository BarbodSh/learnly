import connectToDB from "@/backend/configs/db";
import { createCategory } from "@/backend/utils/category";
import categoryModel from "@/models/category";
import { authAdmin } from "@/backend/utils/helper";
import { NextResponse } from "next/server";
import { categoryValidation } from "@/validator/category";

export async function POST(req) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const body = await req.json();

    const validate = categoryValidation(body.title);
    if (!validate) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await createCategory(body);
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

export async function GET() {
  await connectToDB();
  try {
    const category = await categoryModel.find();
    return Response.json(
      { message: "successfully", category },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
