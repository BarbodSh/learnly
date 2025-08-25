import connectToDB from "@/lib/backend/configs/db";
import { addToWishList } from "@/lib/backend/utils/wishList";
import { validateID } from "@/lib/validator/helper";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();
  try {
    const body = await req.json();
    const validateUserId = validateID(body.user);
    const validateCourseId = validateID(body.course);

    if (!validateCourseId || !validateUserId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    const res = await addToWishList(body);
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
