"use client";
import ContinueModal from "@/components/modules/continueModal/continueModal";
import SendModal from "@/components/modules/sendModol/sendModal";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
import { allStatus } from "@/lib/frontend/utils/status";
import { sendResponseTicket } from "@/lib/frontend/utils/ticket";
import { validateResponseTicket } from "@/lib/validator/ticket";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function TableForTicket({ tickets, userID }) {
  const [openDescriptionModal, setOpenDescriptionModal] = useState(false);
  const [openAnswernModal, setOpenAnswernModal] = useState(false);
  const [answerValue, setAnswerValue] = useState("");
  const [id, setID] = useState();
  const router = useRouter();

  const sendAnswer = async () => {
    const newResponseTicket = {
      responder: userID,
      textresponse: answerValue,
      id,
    };

    const validate = validateResponseTicket(newResponseTicket);
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    const res = await sendResponseTicket(newResponseTicket);
    if (res.status === 200) {
      showSuccessSwal("answer is successfully", () => {});
      router.refresh();
      return setAnswerValue("");
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
          <th>title</th>
          <th>date</th>
          <th>priority</th>
          <th>description</th>
          <th>answer</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {tickets.map((ticket, index) => (
          <tr
            key={ticket._id}
            className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
          >
            <td
              className={`p-2 text-center ${
                ticket.isAnswered ? "bg-sky-500" : "bg-red-500"
              }`}
            >
              {index + 1}
            </td>
            <td className="p-2">{ticket.user ? ticket.user.username : "-"}</td>
            <td className="p-2">{ticket.title}</td>
            <td className="p-2">{ticket.date.slice(0, 10)}</td>
            <td className="p-2">
              {ticket.priority === 1 && "low"}
              {ticket.priority === 2 && "medium"}
              {ticket.priority === 3 && "high"}
            </td>
            <td className="p-2 cursor-pointer">
              <div
                className="border-1 border-sky-500 hover:bg-sky-500 transition-all duration-200 ease-in rounded-lg p-2"
                onClick={() => setOpenDescriptionModal(ticket._id)}
              >
                View
              </div>
              <ContinueModal
                continueModal={openDescriptionModal === ticket._id}
                setContinueModal={setOpenDescriptionModal}
                text={ticket.description}
              />
            </td>
            <td className="p-2 cursor-pointer">
              <div
                className="border-1 border-yellow-500 hover:bg-yellow-500 transition-all duration-200 ease-in rounded-lg p-2"
                onClick={() => {
                  setOpenAnswernModal(ticket._id);
                  setID(ticket._id);
                }}
              >
                awnser
              </div>
              <SendModal
                continueModal={openAnswernModal === ticket._id}
                setContinueModal={setOpenAnswernModal}
                value={answerValue}
                setValue={setAnswerValue}
                send={sendAnswer}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableForTicket;
