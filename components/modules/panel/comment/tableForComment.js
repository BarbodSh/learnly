"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import ContinueModal from "../../continueModal/continueModal";
function TableForComment({ comments }) {
  const [continueModal, setContinueModal] = useState(false);

  return (
    <>
      <table className="w-full text-sm">
        <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
          <tr className="">
            <th className="p-2">Number</th>
            <th>Date</th>
            <th>Course</th>
            <th>Score</th>
            <th>Status</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {comments.map((comment, index) => (
            <tr
              key={comment._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{comment.date.slice(0, 10)}</td>
              <td className="p-2">
                {comment.course ? comment.course.title : "none"}
              </td>
              <td className="p-2">
                <div className=" flex justify-center items-center">
                  {Array.from({ length: comment.score }, (_, i) => i + 1).map(
                    (star, index) => (
                      <FaStar key={index} />
                    )
                  )}
                  {Array.from(
                    { length: 5 - comment.score },
                    (_, i) => i + 1
                  ).map((star, index) => (
                    <FaRegStar key={index} />
                  ))}
                </div>
              </td>
              <td
                className={`p-2 ${
                  comment.isShow ? "text-green-500" : "text-red-500"
                }`}
              >
                {comment.isShow ? "Confirmation" : "Waitting"}
              </td>
              <td className="p-2">
                <div
                  className="p-1 rounded-lg border-1 border-sky-500 cursor-pointer hover:bg-sky-500 transition duration-200 ease-in"
                  onClick={() => setContinueModal(comment._id)}
                >
                  view
                </div>
                <ContinueModal
                  continueModal={continueModal === comment._id}
                  setContinueModal={setContinueModal}
                  text={comment.text}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableForComment;
