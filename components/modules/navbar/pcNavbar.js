"use client";
import React, { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { BiSearchAlt } from "react-icons/bi";
import { SlHandbag } from "react-icons/sl";
import Searchbox from "./searchbox";
import Profilebox from "./profilebox";
import { GoSun } from "react-icons/go";
import { BsMoonStars } from "react-icons/bs";
import Link from "next/link";
import Bagbox from "./bagbos";

function PcNavbar({
  toggleTheme,
  theme,
  user,
  category,
  slug,
  stickyNavbar,
  isLoading,
}) {
  const [searchModal, setSearchModal] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [bagModal, setBagModal] = useState(false);
  const [mainCategory, setMainCategory] = useState("");
  return (
    <div
      className={`pc-navbar relative z-30 flex justify-between items-center bg-white p-5 dark:bg-dark dark:text-white mamad sara ease-in-out max-md:hidden 
        ${stickyNavbar ? "" : "shadow-xl"}
      `}
    >
      <div>
        <ul className="flex justify-strat items-center gap-5 text-xl font-bold">
          {category.length === 0
            ? Array.from({ length: 4 }, (_, i) => i + 1).map((i, index) => (
                <div
                  className="bg-gray-200 rounded-2xl w-25 h-8 animate-pulse"
                  key={index}
                ></div>
              ))
            : category.map((category) => (
                <Link
                  key={category._id}
                  className="relative"
                  href={`/courses/${category._id}`}
                  onClick={() => {
                    setMainCategory(category.title);
                  }}
                >
                  <li className="relative group">
                    <span
                      className={`before:absolute before:content-[''] before:h-1 before:w-full before:rounded-2xl before:-bottom-1 before:left-0 group-hover:before:w-full before:transition-all before:duration-200 before:ease-in ${
                        slug === category._id ? "before:bg-sky-500" : ""
                      }`}
                    >
                      {category.title}
                    </span>
                  </li>
                </Link>
              ))}
        </ul>
      </div>
      <div className="flex justify-start items-center gap-5">
        <div className="flex justify-start items-center gap-5 text-xl">
          {theme === "dark" ? (
            <GoSun
              className="cursor-pointer text-white"
              onClick={toggleTheme}
            />
          ) : (
            <BsMoonStars className="cursor-pointer" onClick={toggleTheme} />
          )}
          <SlHandbag
            className={`cursor-pointer z-40 ${
              searchModal === true || profileModal === true || bagModal === true
                ? "text-white"
                : ""
            }`}
            onClick={() => {
              setBagModal(!bagModal);
              setProfileModal(false);
              setSearchModal(false);
            }}
          />
          <BiSearchAlt
            className={`cursor-pointer z-40 ${
              searchModal === true || profileModal === true || bagModal === true
                ? "text-white"
                : ""
            }`}
            onClick={() => {
              setSearchModal(!searchModal);
              setProfileModal(false);
              setBagModal(false);
            }}
          />
          {isLoading ? (
            <div className="bg-gray-200 rounded-2xl w-25 h-8 animate-pulse"></div>
          ) : user ? (
            <FaRegUser
              className={`cursor-pointer z-40 ${
                searchModal === true ||
                profileModal === true ||
                bagModal === true
                  ? "text-white"
                  : ""
              }`}
              onClick={() => {
                setProfileModal(!profileModal);
                setSearchModal(false);
                setBagModal(false);
              }}
            />
          ) : (
            <Link
              className="border-1 border-sky-500 p-1 rounded-lg transition duration-200 ease-in hover:bg-sky-500 font-bold"
              href="/login"
            >
              Login / Register
            </Link>
          )}

          <Link className="font-bold text-4xl max-lg:hidden" href="/">
            Learnly
          </Link>
        </div>
        <Searchbox searchModal={searchModal} />
        <Profilebox data={user} profileModal={profileModal} />
        <Bagbox bagModal={bagModal} />
        <div
          className={`fixed top-0 right-0 left-0 w-full h-full bg-black/30 z-30 ${
            searchModal === true || profileModal === true || bagModal === true
              ? "block"
              : "hidden"
          }`}
          onClick={() => {
            setSearchModal(false);
            setProfileModal(false);
            setBagModal;
          }}
        ></div>
      </div>
    </div>
  );
}

export default PcNavbar;
