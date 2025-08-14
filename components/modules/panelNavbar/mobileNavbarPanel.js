import Link from "next/link";
import React, { useState } from "react";
import { GoSun } from "react-icons/go";
import { BsMoonStars } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";

function MobileNavbarPanel({ toggleTheme, theme, username }) {
  const [openMenu, setOpenMenu] = useState(false);
  const [notifeModal, setNotefiModal] = useState(false);

  return (
    <div className="mobile-navbar relative z-30 md:hidden p-5">
      <div className="relative z-40 flex justify-end items-center gap-3 top-0">
        {theme === "dark" ? (
          <GoSun
            className="cursor-pointer text-2xl text-white"
            onClick={toggleTheme}
          />
        ) : (
          <BsMoonStars
            className="cursor-pointer text-2xl"
            onClick={toggleTheme}
          />
        )}
        <IoNotificationsOutline
          className="cursor-pointer text-2xl dark:text-white"
          onClick={() => setNotefiModal(!notifeModal)}
        />
        <div className="cursor-pointer" onClick={() => setOpenMenu(!openMenu)}>
          <span
            className={`bg-black dark:bg-white h-1 w-9 block rounded-2xl transition-all sara ease-in-out ${
              openMenu ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-black dark:bg-white h-1 w-9 block rounded-2xl mt-1 transition-all sara ease-in-out
                ${openMenu ? "rotate-45 translate-y-1" : "rotate-0"}`}
          ></span>
          <span
            className={`bg-black dark:bg-white h-1 w-9 block rounded-2xl mt-1 transition-all sara ease-in-out
                ${openMenu ? "-rotate-45 -translate-y-1" : "rotate-0"}`}
          ></span>
        </div>
      </div>
      <div
        className={`fixed top-0 right-0 bottom-0 w-0 h-full bg-black/60 transition-all duration-200 ease-in ${
          openMenu ? "w-full opacity-100" : "w-0 opacity-0"
        }`}
      >
        <div className="container flex flex-col justify-between items-start h-full p-2 text-white font-bold">
          <ul className="flex flex-col justify-center items-start gap-5 text-xl">
            <Link href="#">
              <li className="text-3xl">
                <span className="border-b-2 border-white p-1 mb-5 block">
                  Learnly
                </span>
              </li>
            </Link>
            <Link href="#">
              <li className="">
                <span>{username}</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div
        className={`absolute z-20 top-20 right-10 dark:bg-dark bg-white shadow-lg p-5 w-50 rounded-lg flex flex-col gap-2 justify-center items-start ${
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
  );
}

export default MobileNavbarPanel;
