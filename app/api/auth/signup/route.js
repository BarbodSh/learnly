import connectToDB from "@/backend/configs/db";
import createUser from "@/backend/utils/signup";
import { validateSignUp } from "@/lib/validator/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const validate = validateSignUp(body);
    if (validate !== true) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await createUser(body);
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
