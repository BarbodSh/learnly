import connectToDB from "@/backend/configs/db";
import { authAdmin } from "@/backend/utils/helper";
import { removeNotification } from "@/backend/utils/notification";
import { validateID } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const isAdnmin = await authAdmin();
    if (!isAdnmin) {
      throw new Error("this api protected and you can't access it");
    }

    const param = await params;
    const validateId = validateID(param.id);
    if (!validateId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await removeNotification(param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
