"use client";
import ContinueModal from "@/modules/continueModal/continueModal";
import RemoveModal from "@/modules/removeModal/removeModal";
import { showSuccessSwal } from "@/frontend/utils/helper";
import { allStatus } from "@/frontend/utils/status";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { removeUserNotification } from "@/frontend/utils/notification";

function TableForNotification({ notification, userId }) {
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [id, setID] = useState();
  const router = useRouter();

  const removeCommentHandler = async () => {
    const res = await removeUserNotification(userId, id);
    if (res.status === 200) {
      showSuccessSwal("remove notife is successfully");
      return router.refresh();
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <div className="w-full gdfgdfs">
      <table className="w-full text-sm">
        <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
          <tr className="">
            <th className="p-2">Number</th>
            <th>Title</th>
            <th>Description</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {notification?.map((notif, index) => (
            <tr
              key={notif._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{notif.title}</td>
              <td className="p-2 cursor-pointer">
                <div
                  className="border-1 border-sky-500 hover:bg-sky-500 transition-all duration-200 ease-in rounded-lg p-2"
                  onClick={() => setOpenDescriptionModal(notif._id)}
                >
                  View
                </div>
                <ContinueModal
                  continueModal={openDescriptionModal === notif._id}
                  setContinueModal={setOpenDescriptionModal}
                  text={notif.description}
                />
              </td>
              <td className="p-2">
                <div
                  className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer"
                  onClick={() => {
                    setOpenRemoveModal(notif._id);
                    setID(notif._id);
                  }}
                >
                  remove
                </div>
                <RemoveModal
                  remove={removeCommentHandler}
                  openRemoveModal={openRemoveModal === notif._id}
                  setOpenRemoveModal={setOpenRemoveModal}
                  title={"are you sure about remove comment?"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TableForNotification;
