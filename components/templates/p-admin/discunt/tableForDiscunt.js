"use client";
import RemoveModal from "@/components/modules/removeModal/removeModal";
import { removeDiscunt } from "@/lib/frontend/utils/discunt";
import { showSuccessSwal } from "@/lib/frontend/utils/helper";
import { allStatus } from "@/lib/frontend/utils/status";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function TableForDiscunt({ discunts }) {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [id, setId] = useState(null);
  const router = useRouter();

  const removeDiscuntHandler = async () => {
    const res = await removeDiscunt(id);
    if (res.status === 200) {
      showSuccessSwal("discunt code delete successfully");
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
          <th>date</th>
          <th>percent</th>
          <th>max use</th>
          <th>uses</th>
          <th>remove</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {discunts.map((discunt, index) => (
          <tr
            key={discunt._id}
            className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
          >
            <td
              className={`p-2 ${
                discunt.maxUse === discunt.uses ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {index + 1}
            </td>
            <td className="p-2">{discunt.code}</td>
            <td className="p-2">{discunt.createdAt.slice(0, 10)}</td>
            <td className="p-2">{discunt.percent}</td>
            <td className="p-2">{discunt.maxUse}</td>
            <td className="p-2">{discunt.uses}</td>
            <td className="p-2 ">
              <div
                className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer"
                onClick={() => {
                  setOpenRemoveModal(discunt._id);
                  setId(discunt._id);
                }}
              >
                remove
              </div>
              <RemoveModal
                remove={removeDiscuntHandler}
                openRemoveModal={openRemoveModal === discunt._id}
                setOpenRemoveModal={setOpenRemoveModal}
                title={"are you sure about remove comment?"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableForDiscunt;
