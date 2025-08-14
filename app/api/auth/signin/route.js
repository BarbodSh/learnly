import connectToDB from "@/backend/configs/db";
import loginUser from "@/backend/utils/signin";
import { validateSignin } from "@/lib/validator/user";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const validate = validateSignin(body);
    if (!validate) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await loginUser(body);
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
