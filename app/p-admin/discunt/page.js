import React from "react";
import TableForDiscunt from "@/templates/p-admin/discunt/tableForDiscunt";
import DiscuntForm from "@/templates/p-admin/discunt/discuntForm";
import { getDiscunt } from "@/backend/utils/discunt";
export const revalidate = 0;
async function page() {
  const discunt = await getDiscunt();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <DiscuntForm />
        <TableForDiscunt discunts={discunt} />
      </div>
    </div>
  );
}

export default page;
