import Information from "@/templates/p-admin/home/information";
import Chart from "@/templates/p-admin/home/chart";
import Navigation from "@/templates/p-admin/home/navigation";
import React from "react";

function page() {
  return (
    <div className=" p-5 dark:text-white">
      <Navigation />
      <Chart />
      <Information />
    </div>
  );
}

export default page;
