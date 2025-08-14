import React from "react";

function CoursesBoxLoading({ col = "col-span-4" }) {
  return (
    <div
      className={`${col} overflow-hidden rounded-xl shadow-xl flex flex-col justify-start items-start bg-white dark:bg-dark mamad sara ease-in-out max-lg:col-span-6 max-sm:col-span-12`}
    >
      <div className="rounded-xl overflow-hidden w-full h-50 animate-pulse bg-gray-300"></div>
      <div className="p-3 animate-pulse text-black w-full flex flex-col justify-between items-start dark:text-white mamad sara ease-in-out">
        <div className="border-b-1 border-gray-300 p-1 w-full">
          <div className="w-13 h-5 bg-gray-300 rounded-2xl mb-3"></div>
          <div className="w-full h-20 bg-gray-300 rounded-2xl mb-3"></div>
        </div>
        <div className="p-1 flex justify-between items-center w-full mt-3 mb-3">
          <div className="w-13 h-5 bg-gray-300 rounded-2xl"></div>
          <div className="w-13 h-5 bg-gray-300 rounded-2xl"></div>
        </div>
        <div className="w-full h-10 bg-gray-300 rounded-2xl"></div>
      </div>
    </div>
  );
}

export default CoursesBoxLoading;
