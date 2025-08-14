import connectToDB from "@/lib/backend/configs/db";
import orderCourse from "@/lib/backend/utils/order";
import { validateID } from "@/lib/validator/helper";
import { validateOrder } from "@/lib/validator/order";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    const validate = validateOrder(body);
    const validateId = validateID(body.user);
    if ((!validateId, validate !== true)) {
      return NextResponse.json(
        { message: "data is not valid" },
        { status: 400 }
      );
    }

    await connectToDB();
    const res = await orderCourse(body);
    return res;
  } catch (err) {
    return NextResponse.json({ message: "error from server" }, { status: 500 });
  }
}
