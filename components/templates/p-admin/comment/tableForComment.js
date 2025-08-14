"use client";
import ContinueModal from "@/modules/continueModal/continueModal";
import RemoveModal from "@/modules/removeModal/removeModal";
import SendModal from "@/modules/sendModol/sendModal";
import {
  confirmComment,
  removeComment,
  sendAnswer,
} from "@/frontend/utils/comment";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { allStatus } from "@/frontend/utils/status";
import { commentTextValidate } from "@/validator/comment";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function TableForComment({ comments, userID }) {
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [openConfirmationModal, setOpenConfirmationModal] = useState(false);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [openAnswernModal, setOpenAnswernModal] = useState(false);
  const [answerValue, setAnswerValue] = useState("");
  const [id, setID] = useState();
  const router = useRouter();

  const confirmationComment = async () => {
    const res = await confirmComment(id);

    if (res.status === 200) {
      showSuccessSwal("confirmation comment is successfully");
      return router.refresh();
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  const removeCommentHandler = async () => {
    const res = await removeComment(id);
    if (res.status === 200) {
      showSuccessSwal("remove comment is successfully");
      return router.refresh();
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  const sendAnswerHandler = async () => {
    const validateTextResponse = commentTextValidate(answerValue);
    if (validateTextResponse !== true) {
      return showErrorSwal(validateTextResponse);
    }
    const newAnswer = {
      commentID: id,
      responder: userID,
      textresponse: answerValue,
    };
    const res = await sendAnswer(newAnswer);

    if (res.status === 200) {
      showSuccessSwal("answer comment is successfully");
      setAnswerValue("");
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
            <th>course</th>
            <th>date</th>
            <th>score</th>
            <th>description</th>
            <th>answer</th>
            <th>status</th>
            <th>remove</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {comments.map((comment, index) => (
            <tr
              key={comment._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td
                className={`p-2 text-center ${
                  comment.isAnswered ? "bg-sky-500" : "bg-red-500"
                }`}
              >
                {index + 1}
              </td>
              <td className="p-2">
                {comment.username ? comment.username.username : "-"}
              </td>
              <td className="p-2">
                {comment?.course ? comment.course.title : "-"}
              </td>
              <td className="p-2">{comment.date.slice(0, 10)}</td>
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
              <td className="p-2 cursor-pointer">
                <div
                  className="border-1 border-sky-500 hover:bg-sky-500 transition-all duration-200 ease-in rounded-lg p-2"
                  onClick={() => setOpenDescriptionModal(comment._id)}
                >
                  View
                </div>
                <ContinueModal
                  continueModal={openDescriptionModal === comment._id}
                  setContinueModal={setOpenDescriptionModal}
                  text={comment.text}
                />
              </td>
              <td className="p-2 cursor-pointer">
                <div
                  className="border-1 border-yellow-500 hover:bg-yellow-500 transition-all duration-200 ease-in rounded-lg p-2"
                  onClick={() => {
                    setOpenAnswernModal(comment._id);
                    setID(comment._id);
                  }}
                >
                  awnser
                </div>
                <SendModal
                  continueModal={openAnswernModal === comment._id}
                  setContinueModal={setOpenAnswernModal}
                  value={answerValue}
                  setValue={setAnswerValue}
                  send={sendAnswerHandler}
                />
              </td>
              <td className="p-2">
                <div
                  className={`border-1 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer ${
                    comment.isShow
                      ? " border-red-500 hover:bg-red-500"
                      : "border-green-500 hover:bg-green-500"
                  }`}
                  onClick={() => {
                    setOpenConfirmationModal(comment._id);
                    setID(comment._id);
                  }}
                >
                  {comment.isShow ? "reject" : "confirm"}
                </div>
                <RemoveModal
                  remove={confirmationComment}
                  openRemoveModal={openConfirmationModal === comment._id}
                  setOpenRemoveModal={setOpenConfirmationModal}
                  title={"are you sure about confirmation comment?"}
                />
              </td>
              <td className="p-2">
                <div
                  className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer"
                  onClick={() => {
                    setOpenRemoveModal(comment._id);
                    setID(comment._id);
                  }}
                >
                  remove
                </div>
                <RemoveModal
                  remove={removeCommentHandler}
                  openRemoveModal={openRemoveModal === comment._id}
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

export default TableForComment;
