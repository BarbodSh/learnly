import Link from "next/link";
import React, { useEffect, useState } from "react";

function LinkForSidebar({ name, link, active, onClick }) {
  return (
    <div>
      <Link
        href={link}
        onClick={() => {
          onClick(link);
        }}
      >
        <div className="relative w-full group">
          <p
            className={`translate-x-0 group-hover:translate-x-8 transition duration-200 ease-in group-hover:text-sky-500 ${
              active === link ? "translate-x-8 text-sky-500" : ""
            }`}
          >
            {name}
          </p>
          <div
            className={`absolute w-0 h-1 rounded-2xl bg-sky-500 top-3.5 left-0 group-hover:w-6 group-hover:opacity-100 transition duration-200 ease-in ${
              active === link ? "opacity-100 w-6" : ""
            }`}
          ></div>
        </div>
      </Link>
    </div>
  );
}

export default LinkForSidebar;
