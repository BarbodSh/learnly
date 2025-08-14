import mongoose from "mongoose";
import discuntModel from "@/models/discunt";
import { authAdmin } from "./helper";
import { NextResponse } from "next/server";

export const createDiscunt = async (body) => {
  const { code, percent, maxUse } = body;

  const findDiscunt = await discuntModel.findOne({ code });
  if (findDiscunt) {
    return NextResponse.json({ message: "already exist" }, { status: 422 });
  }

  const discunt = await discuntModel.create({
    code,
    percent,
    maxUse,
  });

  return NextResponse.json(
    { message: "discunt code create successfully" },
    { status: 201 }
  );
};

export const removeDiscunt = async (id) => {
  const findDiscunt = await discuntModel.findOne({ _id: id });
  if (!findDiscunt) {
    return NextResponse.json({ message: "discunt not found" }, { status: 404 });
  }

  const discunt = await discuntModel.findOneAndDelete({ _id: id });
  return NextResponse.json(
    { message: "delete is successfully" },
    { status: 200 }
  );
};

export const useDiscunt = async (body) => {
  const { dicuntCode } = body;

  const findDiscunt = await discuntModel.findOne({ code: dicuntCode });

  if (!findDiscunt) {
    return NextResponse.json({ message: "code is not found" }, { status: 404 });
  }

  if (findDiscunt.maxUse <= findDiscunt.uses) {
    return NextResponse.json({ message: "code usage limit" }, { status: 422 });
  }

  const incUses = await discuntModel.findOneAndUpdate(
    { code: dicuntCode },
    {
      $inc: {
        uses: 1,
      },
    }
  );

  return NextResponse.json(
    { message: "code found", findDiscunt },
    { status: 200 }
  );
};

export const getDiscunt = async () => {
  const resDiscunt = await discuntModel.find({}).sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resDiscunt));
};
