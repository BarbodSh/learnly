"use client";
import React from "react";
import { SlLogout } from "react-icons/sl";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Profilebox({ profileModal, data }) {
  const router = useRouter();
  const logOut = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
    });
    if (res.status === 200) {
      router.replace("/login");
    }
  };
  return (
    <>
      <div
        className={`absolute z-40 top-25  max-lg:top-22 right-40  max-lg:right-1 rounded-lg w-70 p-3 bg-white flex dark:bg-dark transition-all duration-200 ease-in ${
          profileModal === true
            ? "max-h-80 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } `}
      >
        <ul className="dark:text-white flex flex-col gap-2 justify-start items-start w-full">
          <li className="flex justify-start items-center gap-3 border-b-1 border-gray-300 dark:border-gray-300/30 p-3 w-full">
            <div className="size-15 bg-black dark:bg-white rounded-full"></div>
            <div>
              <p>{data?.username}</p>
              <p>{data?.role === "admin" ? "admin" : "user"}</p>
            </div>
          </li>
          <Link
            href="/panel"
            className="hover:bg-green-600 transition duration-200 ease-in w-full p-3 rounded-2xl flex justify-start items-center gap-3"
          >
            <FaRegUser />
            <li>profile</li>
          </Link>
          {data?.role === "admin" ? (
            <Link
              href="/p-admin"
              className="hover:bg-green-600 transition duration-200 ease-in w-full p-3 rounded-2xl flex justify-start items-center gap-3"
            >
              <FaRegUser />
              <li>admin panel</li>
            </Link>
          ) : null}
          <div
            href="#"
            className="hover:bg-red-600 transition duration-200 ease-in w-full p-3 rounded-2xl flex justify-start items-center gap-3 cursor-pointer"
            onClick={logOut}
          >
            <SlLogout />
            <li>Logout</li>
          </div>
        </ul>
      </div>
    </>
  );
}

export default Profilebox;
