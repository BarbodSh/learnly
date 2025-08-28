"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { BiSearchAlt } from "react-icons/bi";

function Searchbox({ searchModal }) {
  const [searchCourse, setSearchCourse] = useState("");
  const router = useRouter();
  const searchCourseClickHandler = (event) => {
    event.preventDefault();

    router.push(`/courses?title=${searchCourse}`);
  };
  return (
    <div
      className={`absolute z-40 top-25 max-lg:top-22 right-50 max-lg:right-13 rounded-lg h-10 bg-white flex justify-center items-center dark:bg-dark transition-all duration-200 ease-in ${
        searchModal === true
          ? "w-70 opacity-100 visible"
          : "w-0 opacity-0 invisible"
      } `}
    >
      <form
        onSubmit={searchCourseClickHandler}
        action=""
        className="text-black dark:text-white flex justify-between items-center p-3 w-full"
      >
        <input
          type="text"
          className="outline-none w-[90%]"
          placeholder="search ..."
          value={searchCourse}
          onChange={(event) => setSearchCourse(event.target.value)}
        />
        <button>
          <BiSearchAlt className="cursor-pointer" />
        </button>
      </form>
    </div>
  );
}

export default Searchbox;
