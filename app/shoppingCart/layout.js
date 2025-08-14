import { getUserInformation } from "@/backend/utils/helper";
import React from "react";
import Navbar from "@/components/modules/navbar/navbar";

async function layout({ children }) {
  const res = await getUserInformation();
  const user = JSON.parse(JSON.stringify(res));
  return (
    <section>
      <Navbar isLogin={user} />
      <div className="container">{children}</div>
    </section>
  );
}

export default layout;
