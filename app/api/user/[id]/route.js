import connectToDB from "@/backend/configs/db";
import { removeUser, updateUser } from "@/backend/utils/user";
import { authAdmin } from "@/backend/utils/helper";
import { validateID } from "@/validator/helper";
import { NextResponse } from "next/server";
import { validateSignUp } from "@/lib/validator/user";

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
    const res = await removeUser(param.id);
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

export async function PUT(req, { params }) {
  try {
    const param = await params;
    const id = param.id;
    const body = await req.json();
    const validateId = validateID(id);
    const validate = validateSignUp(body);
    if (!validateId || validate !== true) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await updateUser(body, id);
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
