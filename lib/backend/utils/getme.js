import userModel from "@/lib/backend/models/user";
import { verifyToken } from "../auth/user";
import { NextResponse } from "next/server";

const getMe = async (token) => {
  if (!token) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const tokenPayload = verifyToken(token);

  if (!tokenPayload) {
    return NextResponse.json(
      { message: "token not valid" },
      { status: 401, headers: { "Content-Type": "application/json" } }
    );
  }
  const findUser = await userModel.findOne({ email: tokenPayload.email });

  if (!findUser) {
    return NextResponse.json(
      { message: "User not found" },
      { status: 404, headers: { "Content-Type": "application/json" } }
    );
  }

  return NextResponse.json(
    {
      message: "successfully",
      user: {
        id: findUser._id,
        username: findUser.username,
        role: findUser.role,
      },
    },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

export default getMe;
