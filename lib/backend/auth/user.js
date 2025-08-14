import { compare, hash } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import userModel from "@/lib/backend/models/user";

const createHashPassword = async (password) => {
  const hashPassword = await hash(password, 12);
  return hashPassword;
};

const verifyPassword = async (password, hashPassword) => {
  const validateResult = await compare(password, hashPassword);
  return validateResult;
};

const createToken = (data) => {
  const token = sign({ ...data }, process.env.Token_PRIVATE_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const verifyToken = (token) => {
  try {
    const validateResult = verify(token, process.env.Token_PRIVATE_KEY);
    return validateResult;
  } catch (err) {
    return false;
  }
};

const verifyRefreshToken = (token) => {
  try {
    const validateResult = verify(token, process.env.Refresh_Token_PRIVATE_KEY);
    return validateResult;
  } catch (err) {
    return false;
  }
};

const createRefreshToken = (data) => {
  const token = sign({ ...data }, process.env.Refresh_Token_PRIVATE_KEY, {
    expiresIn: "15d",
  });
  return token;
};

const findUser = async (id) => {
  const findUser = await userModel.findOne({ _id: String(id) });
  return findUser;
};

export {
  createHashPassword,
  verifyPassword,
  createToken,
  verifyToken,
  createRefreshToken,
  findUser,
  verifyRefreshToken,
};
