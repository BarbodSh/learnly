import Link from "next/link";
import React from "react";

function Pagination({ href, page, mainPage }) {
  return (
    <Link
      href={href}
      className={`text-bold border-1 border-sky-500 size-8 rounded-lg flex justify-center items-center hover:bg-sky-500 transition duration-200 ease-out ${
        mainPage == page ? "bg-sky-500" : ""
      }`}
    >
      {page}
    </Link>
  );
}

export default Pagination;
