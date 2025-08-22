import React from "react";
import { FaArrowRight } from "react-icons/fa";
import TicketBox from "./ticketBox";
import ticketModel from "@/models/ticket";
import { getTicketForUser } from "@/lib/backend/utils/ticket";
async function Ticket({ userID }) {
  const tickets = await getTicketForUser(userID);

  return (
    <div className="bg-white dark:bg-dark p-5 border-1 border-dark/20 dark:border-white/20 mt-5">
      <div className="flex justify-between items-center w-full">
        <span className="text-lg">Last Tickets:</span>
      </div>
      <div className="flex flex-col justify-center items-center gap-3 mt-3">
        {tickets?.length > 0 ? (
          tickets
            .slice(-4)
            .reverse()
            .map((ticket) => (
              <TicketBox
                key={ticket._id}
                title={ticket.title}
                isAnswered={ticket.isAnswered}
                description={ticket.description}
              />
            ))
        ) : (
          <div className="w-full p-2 bg-red-500 text-center rounded-lg">
            You don't have a ticket.
          </div>
        )}
      </div>
    </div>
  );
}

export default Ticket;
