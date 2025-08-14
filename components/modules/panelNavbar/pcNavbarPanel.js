"use client";
import React, { useState } from "react";
import { GoSun } from "react-icons/go";
import { BsMoonStars } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import Link from "next/link";
import { MdDeleteOutline } from "react-icons/md";

function PcNavbarPanel({ toggleTheme, theme, username }) {
  const [notifeModal, setNotefiModal] = useState(false);
  return (
    <div className="pc-navbar w-full relative z-30 flex justify-between items-center bg-white p-5 mt-5 shadow-xl dark:bg-dark dark:text-white mamad sara ease-in-out max-md:hidden border-1 border-dark/20 dark:border-white/20">
      <div className="flex justify-start items-center gap-2">
        <div className="size-10 rounded-full bg-dark dark:bg-white"></div>
        <div className="font-bold">{username}</div>
      </div>
      <div className="relative flex justify-start items-center gap-5">
        <div className="flex justify-start items-center gap-5 text-2xl">
          {theme === "dark" ? (
            <GoSun
              className="cursor-pointer text-white"
              onClick={toggleTheme}
            />
          ) : (
            <BsMoonStars className="cursor-pointer" onClick={toggleTheme} />
          )}
          <IoNotificationsOutline
            className="cursor-pointer"
            onClick={() => setNotefiModal(!notifeModal)}
          />

          <Link className="font-bold text-4xl max-lg:hidden" href="/">
            Learnly
          </Link>
        </div>
        <div
          className={`absolute top-20 right-10 dark:bg-dark bg-white shadow-lg p-5 w-70 rounded-lg flex flex-col gap-2 justify-center items-start ${
            notifeModal === true ? "block" : "hidden"
          }`}
        >
          <div className="flex justify-between items-center w-full border-b-1 border-dark/60 dark:border-white/60 p-2">
            <span>shjksdf</span>
            <MdDeleteOutline />
          </div>
          <div className="flex justify-between items-center w-full border-b-1 border-dark/60 dark:border-white/60 p-2">
            <span>shjksdf</span>
            <MdDeleteOutline />
          </div>
          <div className="flex justify-center items-center w-full">
            <span className="text-red-600">You don't have a notification.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PcNavbarPanel;
