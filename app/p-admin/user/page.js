import TableForUser from "@/templates/p-admin/user/tableForUser";
import React from "react";
import { getUser } from "@/backend/utils/user";
export const revalidate = 0;
async function page() {
  const user = await getUser();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <TableForUser users={user} />
      </div>
    </div>
  );
}

export default page;
