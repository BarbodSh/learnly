import connectToDB from "@/backend/configs/db";
import createTicket from "@/backend/utils/ticket";
import { validateID } from "@/validator/helper";
import { validateTicket } from "@/validator/ticket";
import { NextResponse } from "next/server";

export async function POST(req) {
  await connectToDB();
  try {
    const body = await req.json();
    const validate = validateTicket(body);
    const validateId = validateID(body.user);
    if (validate !== true || !validateId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    const res = await createTicket(body);
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
