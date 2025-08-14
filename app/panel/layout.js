import NavbarPanel from "@/modules/panelNavbar/panelNavbar";
import PanelSidebar from "@/modules/panelSidebar/panelSidebar";
import { getUserInformation } from "@/backend/utils/helper";
import React from "react";
import { redirect } from "next/navigation";

async function layout({ children }) {
  const res = await getUserInformation();
  if (!res) {
    redirect("/login");
  }

  const user = JSON.parse(JSON.stringify(res));
  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-12 justify-between content-center gap-5">
          <div className="col-span-4 ">
            <PanelSidebar username={user.username} />
          </div>
          <div className="col-span-8">
            <NavbarPanel username={user.username} />
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}

export default layout;
