import connectToDB from "@/backend/configs/db";
import { createDiscunt } from "@/backend/utils/discunt";
import { authAdmin } from "@/backend/utils/helper";
import { validateDiscunt } from "@/validator/discunt";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }
    const body = await req.json();
    const validate = validateDiscunt(body);
    if (validate !== true) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await createDiscunt(body);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
