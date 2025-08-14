import userModel from "@/models/user";
import banModel from "@/models/ban";
import { createHashPassword, findUser } from "../auth/user";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

export const removeUser = async (id) => {
  const checkUser = await findUser(id);
  if (!checkUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  const removeUser = await userModel.findOneAndDelete({ _id: String(id) });

  return NextResponse.json(
    { message: "delete is successfully", username: removeUser.username },
    { status: 200 }
  );
};

export const updateUser = async (body, id) => {
  const { username, name, email, password } = body;

  const checkUser = await findUser(id);
  if (!checkUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const hashPassword = await createHashPassword(password);

  const updateUser = await userModel.findOneAndUpdate(
    { _id: String(id) },
    { username, name, email, password: hashPassword }
  );

  return NextResponse.json(
    { message: "update is successfully" },
    { status: 200 }
  );
};

export const changeRole = async (body) => {
  const { id } = body;

  const user = await userModel.findOne({ _id: id });
  if (!user) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  const role = await userModel.findOneAndUpdate(
    { _id: id },
    {
      role: user.role === "user" ? "admin" : "user",
    }
  );

  return NextResponse.json(
    { message: "change role is successfully" },
    { status: 200 }
  );
};

export const banUser = async (body) => {
  const { email, id } = body;

  const isAvaibleUser = await isAvailable(id, userModel);
  if (!isAvaibleUser) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }
  const ban = await banModel.create({ email });
  const removeUser = await userModel.findOneAndDelete({ _id: id });
  return NextResponse.json({ message: "ban is successfully" }, { status: 200 });
};

export const getUser = async () => {
  const res = await userModel
    .find({}, "role email name username")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(res));
};
