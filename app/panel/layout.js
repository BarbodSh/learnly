import NavbarPanel from "@/modules/panelNavbar/panelNavbar";
import PanelSidebar from "@/modules/panelSidebar/panelSidebar";
import { getUserInformation } from "@/backend/utils/helper";
import React from "react";
import { redirect } from "next/navigation";
import { getUserNotification } from "@/lib/backend/utils/notification";

async function layout({ children }) {
  const res = await getUserInformation();
  if (!res) {
    redirect("/login");
  }

  const user = JSON.parse(JSON.stringify(res));

  const notification = await getUserNotification(user._id);
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-12 justify-between content-center gap-5">
          <div className="col-span-4 ">
            <PanelSidebar username={user.username} />
          </div>
          <div className="col-span-8">
            <NavbarPanel
              userId={user._id}
              username={user.username}
              notification={notification}
            />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default layout;
