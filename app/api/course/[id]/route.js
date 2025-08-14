import connectToDB from "@/backend/configs/db";
import { removeCourse } from "@/backend/utils/course";
import { authAdmin } from "@/lib/backend/utils/helper";
import { validateID } from "@/validator/helper";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const param = await params;
    const validate = validateID(param.id);
    if (!validate) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }
    await connectToDB();
    const res = removeCourse(param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
