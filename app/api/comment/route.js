import connectToDB from "@/backend/configs/db";
import { createComment } from "@/backend/utils/comment";
import { commentValidate } from "@/validator/comment";
import { validateID } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const validateUsernameId = validateID(body.username);
    const validateCourseId = validateID(body.course);
    const validate = commentValidate(body.score, body.text);
    if (!validateUsernameId || !validateCourseId || !validate) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await createComment(body);
    return res;
  } catch (err) {
    return NextResponse.json(
      { error: "خطای داخلی سرور." },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
