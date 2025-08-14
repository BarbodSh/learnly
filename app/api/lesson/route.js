import connectToDB from "@/backend/configs/db";
import { createLesson } from "@/backend/utils/lesson";
import { authAdmin } from "@/lib/backend/utils/helper";
import { validateID } from "@/lib/validator/helper";
import { validateLesson } from "@/validator/lesson";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const isAdnmin = await authAdmin();
    if (!isAdnmin) {
      throw new Error("this api protected and you can't access it");
    }

    const body = await req.json();
    const validateId = validateID(body.courseID);
    const validate = validateLesson(body.title, body.courseID, body.isFree);
    if (validate !== true || !validateId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await createLesson(body);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
