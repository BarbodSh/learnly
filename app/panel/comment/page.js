import TableForComment from "@/modules/panel/comment/tableForComment";
import { getUserInformation } from "@/backend/utils/helper";
import React from "react";
import { getCommentForUser } from "@/lib/backend/utils/comment";
export const revalidate = 0;
async function page() {
  const user = await getUserInformation();
  const comments = await getCommentForUser(user._id);

  return (
    <div className="p-5 dark:text-white">
      <div className="dark:bg-dark bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        {comments?.length > 0 ? (
          <TableForComment comments={comments} />
        ) : (
          <div className="w-full text-center p-2 rounded-lg bg-red-500">
            You don't have a comment.
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
