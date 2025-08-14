import Link from "next/link";
import React, { useState } from "react";
import { GoSun } from "react-icons/go";
import { BsMoonStars } from "react-icons/bs";

function MobileNavbar({ toggleTheme, theme, isLogin, category }) {
  const [openMenu, setOpenMenu] = useState(false);

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
            {category?.map((category) => (
              <Link key={category._id} href={`/courses/${category._id}`}>
                <li className="">
                  <span>{category.title}</span>
                </li>
              </Link>
            ))}
            <Link href="#">
              <li className="">
                <span>Shopping Cart</span>
              </li>
            </Link>
            <Link href="#">
              <li className="">
                <span>Profile</span>
              </li>
            </Link>
          </ul>
          {isLogin ? (
            <div className="p-2 w-50 rounded-lg h-10 border-2 border-red-500 flex justify-center items-center text-xl cursor-pointer">
              <Link href="#">Logout</Link>
            </div>
          ) : (
            <div className="flex justify-between items-center w-full gap-5">
              <div className="p-2 w-full rounded-lg h-10 border-2 border-sky-500 flex justify-center items-center text-xl cursor-pointer">
                <Link href="#">Login</Link>
              </div>
              <div className="p-2 w-full rounded-lg h-10 border-2 border-sky-500 flex justify-center items-center text-xl cursor-pointer">
                <Link href="#">Register</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileNavbar;
