import userModel from "@/models/user";
import notificationModel from "@/models/notification";
import { isAvailable } from "./helper";
import { NextResponse } from "next/server";

export const createNotification = async (body) => {
  const { title, description, userId } = body;
  const checkUser = await isAvailable(userId, userModel);
  if (!checkUser) {
    return NextResponse.json({ message: "user is not found" }, { status: 404 });
  }
  await notificationModel.create({ title, description, recipient: userId });
  return NextResponse.json(
    { message: "create notification is successfully" },
    { status: 201 }
  );
};

export const removeNotification = async (notifId) => {
  const isAvailabNotif = await isAvailable(notifId, notificationModel);
  if (!isAvailabNotif) {
    return NextResponse.json(
      { message: "notif is not found" },
      { status: 404 }
    );
  }

  await notificationModel.findOneAndDelete({ _id: notifId });
  return NextResponse.json(
    { message: "lesson rmeove successfully" },
    { status: 200 }
  );
};

export const removeUserNotification = async (userId, notifId) => {
  const isAvailabNotif = await isAvailable(notifId, notificationModel);
  if (!isAvailabNotif) {
    return NextResponse.json(
      { message: "notif is not found" },
      { status: 404 }
    );
  }

  const UserCheck = await isAvailable(userId, userModel);
  if (!UserCheck) {
    return NextResponse.json({ message: "user is not found" }, { status: 404 });
  }

  const isNotifForThisUser = await notificationModel.findOne({
    _id: notifId,
    user: userId,
  });
  if (!isNotifForThisUser) {
    return NextResponse.json(
      { message: "this notif is not for this user" },
      { status: 422 }
    );
  }

  await notificationModel.findOneAndDelete({ _id: notifId });
  return NextResponse.json(
    { message: "lesson rmeove successfully" },
    { status: 200 }
  );
};

export const getAllNotification = async () => {
  const resNotification = await notificationModel
    .find({})
    .populate("recipient", "username")
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resNotification));
};

export const getUserNotification = async (userId) => {
  const resNotification = await notificationModel
    .find({ user: userId })
    .sort({ _id: -1 });
  return JSON.parse(JSON.stringify(resNotification));
};
