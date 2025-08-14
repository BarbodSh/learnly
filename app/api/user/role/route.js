import connectToDB from "@/backend/configs/db";
import { changeRole } from "@/backend/utils/user";
import { authAdmin } from "@/backend/utils/helper";
import { validateID } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function PUT(req) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }
    const body = await req.json();
    const validateId = validateID(body.id);
    if (!validateId) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = await changeRole(body);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
