import { validateNotification } from "@/validator/notification";
import { validateID } from "@/validator/helper";
import { createNotification } from "@/lib/backend/utils/notification";
import { NextResponse } from "next/server";
import { authAdmin } from "@/lib/backend/utils/helper";
import connectToDB from "@/lib/backend/configs/db";

export async function POST(req) {
  try {
    const isAdnmin = await authAdmin();
    if (!isAdnmin) {
      throw new Error("this api protected and you can't access it");
    }
    const body = await req.json();
    const validateId = validateID(body.userId);
    const validate = validateNotification(body);
    if (validate !== true || !validateId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await createNotification(body);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
