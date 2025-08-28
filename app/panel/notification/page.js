import { getUserInformation } from "@/backend/utils/helper";
import React from "react";
import TableForNotification from "@/modules/panel/notification/notificationTable";
import { getUserNotification } from "@/lib/backend/utils/notification";
export const revalidate = 0;
async function page() {
  const user = await getUserInformation();
  const notification = await getUserNotification(user._id);
  return (
    <div className="p-5 dark:text-white">
      <div className="dark:bg-dark bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        {notification?.length > 0 ? (
          <TableForNotification notification={notification} userId={user._id} />
        ) : (
          <div className="w-full text-center p-2 rounded-lg bg-red-500">
            You don't have a order.
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
