import React from "react";
import ticketModel from "@/models/ticket";
import TableForTicket from "@/components/templates/p-admin/ticket/tableForTicket";
import { getUserInformation } from "@/lib/backend/utils/helper";
import { getTicketForAdmin } from "@/lib/backend/utils/ticket";

async function page() {
  const user = await getUserInformation();
  const ticket = await getTicketForAdmin();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <TableForTicket tickets={ticket} userID={user._id} />
      </div>
    </div>
  );
}

export default page;
