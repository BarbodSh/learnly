"use client";
import RemoveModal from "@/modules/removeModal/removeModal";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import UpdateModal from "./updateModal";
import { removeCategory, updateCategory } from "@/frontend/utils/category";
import { categoryTitleValidation } from "@/validator/category";
import { allStatus } from "@/lib/frontend/utils/status";

function TableForCategory({ categories }) {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [id, setID] = useState();
  const router = useRouter();

  const removeCategoryHandler = async () => {
    const res = await removeCategory(id);
    if (res.status === 200) {
      showSuccessSwal("remove category is successfully");
      return router.refresh();
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  const updateCategoryHandler = async () => {
    const titleValidate = categoryTitleValidation(updateTitle);
    if (titleValidate !== true) {
      setUpdateTitle("");
      return showErrorSwal(titleValidate);
    }
    const res = await updateCategory(id, updateTitle);
    if (res.status === 200) {
      showSuccessSwal("update category is successfully");
      setUpdateTitle("");
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
            <th>Name</th>
            <th>description</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {categories.map((category, index) => (
            <tr
              key={category._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{category.title}</td>
              <td className="p-2 cursor-pointer">
                <div
                  className="border-1 border-sky-500 hover:bg-sky-500 transition-all duration-200 ease-in rounded-lg p-2"
                  onClick={() => {
                    setOpenUpdateModal(category._id);
                    setID(category._id);
                  }}
                >
                  Update
                </div>
                <UpdateModal
                  continueModal={openUpdateModal === category._id}
                  setContinueModal={setOpenUpdateModal}
                  value={updateTitle}
                  setValue={setUpdateTitle}
                  send={updateCategoryHandler}
                />
              </td>
              <td className="p-2">
                <div
                  className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer"
                  onClick={() => {
                    setOpenRemoveModal(category._id);
                    setID(category._id);
                  }}
                >
                  remove
                </div>
                <RemoveModal
                  remove={removeCategoryHandler}
                  openRemoveModal={openRemoveModal === category._id}
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

export default TableForCategory;
