import connectToDB from "@/lib/backend/configs/db";
import { useDiscunt } from "@/lib/backend/utils/discunt";
import { validateCode } from "@/lib/validator/discunt";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const body = await req.json();
    const validate = validateCode(body.dicuntCode);
    if (validate !== true) {
      return NextResponse({ message: "data is not valid" }, { status: 400 });
    }

    await connectToDB();
    const res = await useDiscunt(body);
    return res;
  } catch (err) {
    return NextResponse({ message: "server" }, { status: 500 });
  }
}
