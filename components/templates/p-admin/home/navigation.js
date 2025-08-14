import React from "react";
import NavigationBox from "@/templates/p-admin/home/navigationBox";

function Navigation() {
  return (
    <div>
      <div className="grid grid-cols-12 justify-between content-center gap-5">
        <NavigationBox title={"Comment"} amount={"2300"} />
        <NavigationBox title={"Ticket"} amount={"1100"} />
        <NavigationBox title={"Order"} amount={"100"} />
        <NavigationBox title={"User"} amount={"23000"} />
      </div>
    </div>
  );
}

export default Navigation;
