import React from "react";
import commentModel from "@/models/comment";
import { getUserInformation } from "@/backend/utils/helper";
import TableForComment from "@/templates/p-admin/comment/tableForComment";
import { getCommentForAdmin } from "@/lib/backend/utils/comment";

async function page() {
  const user = await getUserInformation();
  const comments = await getCommentForAdmin();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <TableForComment comments={comments} userID={user._id} />
      </div>
    </div>
  );
}

export default page;
