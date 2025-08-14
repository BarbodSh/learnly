import userModel from "@/models/user";
import { createRefreshToken, createToken, verifyPassword } from "../auth/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const isAvailable = async (identifier) => {
  const findUser = await userModel.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  return findUser;
};

const loginUser = async (body) => {
  const { identifier, password } = body;
  const cookiesStore = await cookies();

  const userIsAvailable = await isAvailable(identifier);
  if (!userIsAvailable) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const checkPassword = await verifyPassword(
    password,
    userIsAvailable.password
  );
  if (!checkPassword) {
    return NextResponse.json(
      { message: "email or password is not correct" },
      { status: 400 }
    );
  }

  const token = createToken({
    email: userIsAvailable.email,
  });

  const refreshToken = createRefreshToken({
    email: userIsAvailable.email,
  });

  await userModel.findOneAndUpdate(
    { $or: [{ email: identifier }, { username: identifier }] },
    { refreshToken }
  );

  cookiesStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookiesStore.set("refresh-token", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(
    { message: "login is successfully", username: userIsAvailable.username },
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

export default loginUser;
