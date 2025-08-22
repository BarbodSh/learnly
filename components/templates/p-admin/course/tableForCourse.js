"use client";
import ContinueModal from "@/components/modules/continueModal/continueModal";
import RemoveModal from "@/components/modules/removeModal/removeModal";
import SendModal from "@/components/modules/sendModol/sendModal";
import { removeCourse } from "@/lib/frontend/utils/course";
import { showSuccessSwal } from "@/lib/frontend/utils/helper";
import { allStatus } from "@/lib/frontend/utils/status";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function TableForCourse({ courses }) {
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [id, setID] = useState();
  const router = useRouter();

  const removeCourseHandler = async () => {
    const res = await removeCourse(id);
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
            <th>teacher</th>
            <th>price</th>
            <th>support</th>
            <th>student</th>
            <th>description</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {courses.map((course, index) => (
            <tr
              key={course._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{course.title}</td>
              <td className="p-2">
                {course.teacher ? course.teacher.username : "-"}
              </td>
              <td className="p-2">
                {course.price === 0 ? "Free" : course.price.toLocaleString()}
              </td>
              <td className="p-2">{course.support}</td>
              <td className="p-2">{course.user?.length}</td>
              <td className="p-2 cursor-pointer">
                <div
                  className="border-1 border-sky-500 hover:bg-sky-500 transition-all duration-200 ease-in rounded-lg p-2"
                  onClick={() => setOpenDescriptionModal(course._id)}
                >
                  View
                </div>
                <ContinueModal
                  continueModal={openDescriptionModal === course._id}
                  setContinueModal={setOpenDescriptionModal}
                  text={course.description}
                />
              </td>
              <td className="p-2">
                <div
                  className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer"
                  onClick={() => {
                    setOpenRemoveModal(course._id);
                    setID(course._id);
                  }}
                >
                  remove
                </div>
                <RemoveModal
                  remove={removeCourseHandler}
                  openRemoveModal={openRemoveModal === course._id}
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

export default TableForCourse;
