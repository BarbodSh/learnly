"use client";
import React, { useState } from "react";
import ContinueModal from "../../continueModal/continueModal";

function TicketTable({ array }) {
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [textresponseModal, setTextresponseModal] = useState(false);
  return (
    <>
      <table className="w-full text-sm">
        <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
          <tr className="">
            <th className="p-2">Number</th>
            <th>Date</th>
            <th>Title</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Description</th>
            <th>Textresponse</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {array.map((ticket, index) => (
            <tr
              key={ticket._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{ticket.date.slice(0, 10)}</td>
              <td className="p-2">{ticket.title}</td>
              <td className="p-2">
                {ticket.priority === 1 && "low"}
                {ticket.priority === 2 && "medium"}
                {ticket.priority === 3 && "high"}
              </td>
              <td
                className={`p-2 ${
                  ticket.isAnswered ? "text-green-500" : "text-red-500"
                }`}
              >
                {ticket.isAnswered ? "Confirmation" : "Waitting"}
              </td>
              <td className="p-2">
                <div
                  className="p-1 rounded-lg border-1 border-sky-500 cursor-pointer hover:bg-sky-500 transition duration-200 ease-in"
                  onClick={() => setDescriptionModal(ticket._id)}
                >
                  view
                </div>
                <ContinueModal
                  continueModal={descriptionModal === ticket._id}
                  setContinueModal={setDescriptionModal}
                  text={ticket.description}
                />
              </td>
              <td className="p-2">
                <button
                  disabled={!ticket.isAnswered}
                  className={`p-1 rounded-lg border-1 transition duration-200 ease-in w-full ${
                    ticket.isAnswered
                      ? "hover:bg-sky-500 border-sky-500 cursor-pointer"
                      : "border-red-500 hover:bg-red-500 cursor-not-allowed"
                  }`}
                  onClick={() => setTextresponseModal(ticket._id)}
                >
                  view
                </button>
                <ContinueModal
                  continueModal={textresponseModal === ticket._id}
                  setContinueModal={setTextresponseModal}
                  text={ticket?.textresponse}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TicketTable;
