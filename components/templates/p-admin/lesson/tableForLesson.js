"use client";
import RemoveModal from "@/modules/removeModal/removeModal";
import { showSuccessSwal } from "@/frontend/utils/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { allStatus } from "@/frontend/utils/status";
import { removeLesson } from "@/frontend/utils/lesson";

function TableForLesson({ lessones }) {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [id, setID] = useState();
  const router = useRouter();

  const removeLessonHandler = async () => {
    const res = await removeLesson(id);

    if (res.status === 200) {
      showSuccessSwal("remove comment is successfully");
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
            <th>is Free</th>
            <th>course</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {lessones.map((lesson, index) => (
            <tr
              key={lesson._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{lesson.title}</td>
              <td className="p-2">{lesson.isFree ? "Yes" : "No"}</td>
              <td className="p-2">
                {lesson.course ? lesson.course.title : "-"}
              </td>
              <td className="p-2">
                <div
                  className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer"
                  onClick={() => {
                    setOpenRemoveModal(lesson._id);
                    setID(lesson._id);
                  }}
                >
                  remove
                </div>
                <RemoveModal
                  remove={removeLessonHandler}
                  openRemoveModal={openRemoveModal === lesson._id}
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

export default TableForLesson;
