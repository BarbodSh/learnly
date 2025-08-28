import connectToDB from "@/backend/configs/db";
import { removeUserNotification } from "@/backend/utils/notification";
import { validateID } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId")?.trim();
    const param = await params;
    const validateId = validateID(param.id);
    if (!validateId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await removeUserNotification(userId, param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
