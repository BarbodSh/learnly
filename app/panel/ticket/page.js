import { getUserInformation } from "@/backend/utils/helper";
import React from "react";
import TicketForm from "@/modules/panel/ticket/ticketForm";
import TicketTable from "@/modules/panel/ticket/ticketTable";
import { getTicketForUser } from "@/backend/utils/ticket";

async function page() {
  const user = await getUserInformation();

  const ticket = await getTicketForUser(user._id);

  return (
    <div className="p-5 dark:text-white">
      <div className="dark:bg-dark bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex flex-col gap-7 justify-center content-center flex-wrap">
        <TicketForm user={user._id} />
        {ticket.length > 0 ? (
          <TicketTable array={ticket} />
        ) : (
          <div className="w-full text-center p-2 rounded-lg bg-red-500">
            You don't have a Ticket.
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
