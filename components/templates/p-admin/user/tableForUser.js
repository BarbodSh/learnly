"use client";
import RemoveModal from "@/modules/removeModal/removeModal";
import { showSuccessSwal } from "@/frontend/utils/helper";
import { allStatus } from "@/frontend/utils/status";
import { banUser, changeRole, removeUser } from "@/frontend/utils/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function TableForUser({ users }) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openBanModal, setOpenBanModal] = useState(false);
  const [id, setId] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();

  const changeRoleHandler = async () => {
    const res = await changeRole(id);

    if (res.status === 200) {
      showSuccessSwal("change role is successfully");
      return router.refresh();
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  const removeUserHandler = async () => {
    const res = await removeUser(id);
    if (res.status === 200) {
      showSuccessSwal("remove user is successfully");
      return router.refresh();
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  const banUserHandler = async () => {
    const res = await banUser(id, email);
    if (res.status === 200) {
      showSuccessSwal("ban user is successfully");
      return router.refresh();
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <table className="w-full text-sm">
      <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
        <tr className="">
          <th className="p-2">Number</th>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Change Role</th>
          <th>Remove</th>
          <th>Ban</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {users.map((user, index) => (
          <tr
            key={user._id}
            className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
          >
            <td className="p-2 text-center">{index + 1}</td>
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.username}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2 cursor-pointer">
              <div
                className="border-1 border-sky-500 hover:bg-sky-500 transition-all duration-200 ease-in rounded-lg p-2"
                onClick={() => {
                  setOpenUpdateModal(user._id);
                  setId(user._id);
                }}
              >
                Change Role
              </div>
              <RemoveModal
                remove={changeRoleHandler}
                openRemoveModal={openUpdateModal === user._id}
                setOpenRemoveModal={setOpenUpdateModal}
                title={"Are you sure about change role?"}
              />
            </td>
            <td className="p-2 cursor-pointer">
              <div
                className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2"
                onClick={() => {
                  setOpenRemoveModal(user._id);
                  setId(user._id);
                }}
              >
                remove
              </div>
              <RemoveModal
                remove={removeUserHandler}
                openRemoveModal={openRemoveModal === user._id}
                setOpenRemoveModal={setOpenRemoveModal}
                title={"Are you sure about remove user?"}
                setOpenBanModal
              />
            </td>
            <td className="p-2 cursor-pointer">
              <div
                className="border-1 border-black dark:border-gray-200 hover:bg-black dark:hover:bg-primary-dark transition-all duration-200 ease-in rounded-lg p-2 hover:text-white"
                onClick={() => {
                  setOpenBanModal(user._id);
                  setId(user._id);
                  setEmail(user.email);
                }}
              >
                ban
              </div>
              <RemoveModal
                remove={banUserHandler}
                openRemoveModal={openBanModal === user._id}
                setOpenRemoveModal={setOpenBanModal}
                title={"Are you sure about ban user?"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableForUser;
