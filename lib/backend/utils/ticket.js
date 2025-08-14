import userModel from "@/models/user";
import ticketModel from "@/models/ticket";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

const createTicket = async (body) => {
  const { title, user, description, priority } = body;

  const isUserAvaible = await isAvailable(user, userModel);
  if (!isUserAvaible) {
    return NextResponse.json({ message: "user not found" }, { status: 404 });
  }

  const ticket = await ticketModel.create({
    title,
    user,
    description,
    priority,
  });

  return NextResponse.json(
    { message: "ticket create successfully" },
    { status: 201 }
  );
};

export const answerTicket = async (body) => {
  const { responder, textresponse, id } = body;

  const isAvaibleTicket = await isAvailable(id, ticketModel);
  if (!isAvaibleTicket) {
    return NextResponse.json({ message: "user not found" } < { status: 404 });
  }

  const answerTicket = await ticketModel.findOneAndUpdate(
    { _id: id },
    { responder, textresponse, isAnswered: true }
  );

  return NextResponse.json(
    { message: "asnwer is successfully" },
    { status: 200 }
  );
};

export const getTicketForUser = async (userID) => {
  const resTicket = await ticketModel.find({ user: userID }).sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resTicket));
};

export const getTicketForAdmin = async () => {
  const resTicket = await ticketModel
    .find({})
    .populate("user", "username")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resTicket));
};

export default createTicket;
