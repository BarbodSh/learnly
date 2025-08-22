import { getUserInformation } from "@/backend/utils/helper";
import ProfileDetails from "@/components/modules/panel/profile/profileDetails";
import React from "react";
export const revalidate = 0;
async function page() {
  const user = await getUserInformation();

  return (
    <div className="p-5 dark:text-white">
      <div className="dark:bg-dark bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <ProfileDetails
          name={user.name}
          username={user.username}
          email={user.email}
          _id={user._id}
        />
      </div>
    </div>
  );
}

export default page;
