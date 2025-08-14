import connectToDB from "@/lib/backend/configs/db";
import { authAdmin } from "@/lib/backend/utils/helper";
import { answerTicket } from "@/lib/backend/utils/ticket";
import { validateID } from "@/lib/validator/helper";
import { validateResponseTicket } from "@/lib/validator/ticket";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const body = await req.json();
    const validate = validateResponseTicket(body);
    const validateResponderId = validateID(body.responder);
    const validateTicketId = validateID(body.id);

    if (validate !== true || !validateResponderId || !validateTicketId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await answerTicket(body);
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
