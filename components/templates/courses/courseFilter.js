"use client";
import React from "react";

function CourseFilter({ value, setValue }) {
  return (
    <div className="sticky p-5 top-25 h-fit col-span-4 bg-white dark:bg-dark rounded-lg mamad sara ease-in-out max-md:col-span-12 max-md:relative max-md:top-0">
      <ul className="flex flex-col dark:text-white text-2xl justify-center items-start gap-3 max-lg:text-xl max-lg:gap-1">
        <div
          className={`p-2  w-full rounded-2xl cursor-pointer ${
            value === "All"
              ? "bg-sky-500"
              : "hover:bg-sky-500 transition duration-200 ease-in"
          }`}
          onClick={() => {
            setValue("All");
          }}
        >
          <li>All Courses</li>
        </div>
        <div
          className={`p-2  w-full rounded-2xl cursor-pointer ${
            value === "Free"
              ? "bg-sky-500"
              : "hover:bg-sky-500 transition duration-200 ease-in"
          }`}
          onClick={() => {
            setValue("Free");
          }}
        >
          <li>Free Courses</li>
        </div>
        <div
          className={`p-2  w-full rounded-2xl cursor-pointer ${
            value === "Premium"
              ? "bg-sky-500"
              : "hover:bg-sky-500 transition duration-200 ease-in"
          }`}
          onClick={() => {
            setValue("Premium");
          }}
        >
          <li>Expensive to cheap</li>
        </div>
        <div
          className={`p-2  w-full rounded-2xl cursor-pointer ${
            value === "Cheap"
              ? "bg-sky-500"
              : "hover:bg-sky-500 transition duration-200 ease-in"
          }`}
          onClick={() => {
            setValue("Cheap");
          }}
        >
          <li>Cheap to expensive</li>
        </div>
        <div
          className={`p-2  w-full rounded-2xl cursor-pointer ${
            value === "Random"
              ? "bg-sky-500"
              : "hover:bg-sky-500 transition duration-200 ease-in"
          }`}
          onClick={() => {
            setValue("Random");
          }}
        >
          <li>Random Courses</li>
        </div>
      </ul>
    </div>
  );
}

export default CourseFilter;
