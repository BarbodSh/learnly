import React from "react";
import orderModel from "@/models/order";
import TableForDiscunt from "@/templates/p-admin/discunt/tableForDiscunt";
import TableForOrder from "@/components/templates/p-admin/order/tableForOrder";
import { getOrderForAdmin } from "@/lib/backend/utils/order";

async function page() {
  const order = await getOrderForAdmin();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <TableForOrder orders={order} />
      </div>
    </div>
  );
}

export default page;
