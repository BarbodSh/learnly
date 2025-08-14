import userModel from "@/models/user";
import banModel from "@/models/ban";
import {
  createHashPassword,
  createRefreshToken,
  createToken,
} from "../auth/user";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const isAvailable = async (username, email) => {
  const findUser = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  return findUser;
};

const createUser = async (body) => {
  const { name, username, email, password } = body;

  const userIsAvailable = await isAvailable(username, email);
  if (userIsAvailable) {
    return NextResponse.json(
      { message: "This Username or Email Exist already" },
      { status: 409 }
    );
  }

  const hashPassword = await createHashPassword(password);
  const token = createToken({ email });
  const refreshToken = createRefreshToken({ email });
  const isBan = await banModel.findOne({ email });

  if (isBan) {
    return NextResponse.json({ message: "user is ban" }, { status: 401 });
  }

  const userCount = await userModel.countDocuments();

  const createNewUser = await userModel.create({
    name,
    username,
    email,
    password: hashPassword,
    role: userCount === 0 ? "admin" : "user",
    refreshToken,
  });

  cookies().set("refresh-token", refreshToken, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  cookies().set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return NextResponse.json(
    { message: "register is successfully", username },
    { status: 201, headers: { "Content-Type": "application/json" } }
  );
};

export default createUser;
