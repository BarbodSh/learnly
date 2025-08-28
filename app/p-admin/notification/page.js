import React from "react";
import NotificationForm from "@/templates/p-admin/notification/notificationForm";
import { getAllNotification } from "@/backend/utils/notification";
import { getUser } from "@/lib/backend/utils/user";
import TableForNotification from "@/components/templates/p-admin/notification/notificationTable";
export const revalidate = 0;
async function page() {
  const notification = await getAllNotification();
  const allUser = await getUser();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <NotificationForm users={allUser} />
        <TableForNotification notification={notification} />
      </div>
    </div>
  );
}

export default page;
