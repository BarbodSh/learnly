import connectToDB from "@/backend/configs/db";
import { removeDiscunt } from "@/backend/utils/discunt";
import { authAdmin } from "@/backend/utils/helper";
import { validateID } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const param = await params;
    const validateId = validateID(param.id);
    await connectToDB();
    const res = await removeDiscunt(param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
