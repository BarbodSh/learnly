import connectToDB from "@/lib/backend/configs/db";
import { removeWishList } from "@/lib/backend/utils/wishList";
import { validateID } from "@/lib/validator/helper";
import { NextResponse } from "next/server";
import wishListModel from "@/models/wishList";

export async function DELETE(req, { params }) {
  try {
    const param = await params;
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("user");

    const validateUserId = validateID(userId);
    const validateCourseId = validateID(param.id);
    if (!validateCourseId || !validateUserId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await removeWishList(param.id, userId);
    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "خطای داخلی سرور." },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET(req, { params }) {
  await connectToDB();
  try {
    const { id } = await params;
    const wishList = await wishListModel.find({ user: id });
    return Response.json(
      { message: "successfully", wishList },
      { status: 200 }
    );
  } catch (err) {
    return Response.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
