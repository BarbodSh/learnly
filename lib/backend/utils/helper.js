import { verifyToken } from "@/backend/auth/user";
import userModel from "@/models/user";
import connectToDB from "../configs/db";
import { cookies } from "next/headers";

export const getUserInformation = async () => {
  await connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (token) {
    const tokenPayload = verifyToken(token);
    if (tokenPayload) {
      const res = await userModel.findOne({ email: tokenPayload.email });
      return JSON.parse(JSON.stringify(res));
    }
  }

  return false;
};

export const authAdmin = async () => {
  await connectToDB();
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }
  const tokenPayload = verifyToken(token.value);
  if (!tokenPayload) {
    return null;
  }

  const user = await userModel.findOne({ email: tokenPayload.email });
  if (user.role === "admin") {
    return user;
  }

  return null;
};

export const isAvailable = async (id, model) => {
  const find = await model.findOne({ _id: id });
  return find;
};
