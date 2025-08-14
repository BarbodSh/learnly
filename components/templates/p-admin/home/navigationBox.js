import React from "react";
import { FaChartSimple } from "react-icons/fa6";
function NavigationBox({ title, amount }) {
  return (
    <div className="dark:bg-dark col-span-6 bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
      <FaChartSimple className="text-4xl" />
      <div className="text-2xl">
        <span>{title} :</span>
        <span className="ml-2 text-xl">{amount?.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default NavigationBox;
