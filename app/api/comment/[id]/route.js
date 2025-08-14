import connectToDB from "@/lib/backend/configs/db";
import {
  confirmationComment,
  removeComment,
} from "@/lib/backend/utils/comment";
import { authAdmin } from "@/lib/backend/utils/helper";
import { validateID } from "@/lib/validator/helper";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
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
    const res = await removeComment(param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const isAdmin = await authAdmin();
    if (!isAdmin) {
      throw new Error("this api protected and you can't access it");
    }

    const param = await params;
    const validation = validateID(param.id);
    if (!validation) {
      return Response.json({ message: "data is not valid" }, { status: 400 });
    }

    await connectToDB();
    const res = await confirmationComment(param.id);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "server error" }, { status: 500 });
  }
}
