"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import {
  getMe,
  showErrorSwal,
  showSuccessSwal,
} from "@/lib/frontend/utils/helper";
import { addToWishList } from "@/frontend/utils/wishList";
import { allStatus } from "@/lib/frontend/utils/status";
function CourseBox({
  title,
  coverImage,
  user: student,
  price,
  description,
  isFree,
  _id,
  colspan,
}) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const addToWishListHandler = async () => {
    const res = await addToWishList(user.id, _id);
    if (res.status === 200) {
      return showSuccessSwal("course add to wish list");
    }
    if (res.status === 422) {
      return showErrorSwal("already exist");
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  useEffect(() => {
    getMe(setUser, setIsLoading);
  }, []);

  return (
    <div
      className={`${colspan} overflow-hidden rounded-xl shadow-xl flex flex-col justify-start items-start bg-white dark:bg-dark mamad sara ease-in-out max-xl:col-span-4 max-lg:col-span-6 max-sm:col-span-12`}
    >
      <Link href={`/course/${_id}`}>
        <div className="rounded-xl overflow-hidden w-full">
          <Image
            alt="payton-image"
            className="bg-cover w-full"
            src={coverImage || "/images/payton.webp"}
            width={400}
            height={400}
            priority
          />
        </div>
      </Link>
      <div className="p-3 text-black w-full flex flex-col justify-between items-start dark:text-white mamad sara ease-in-out">
        <Link href={`/course/${_id}`}>
          <div className="border-b-1 border-gray-300 p-1 h-35">
            <h4 className="text-xl font-bold mb-3">{title}</h4>
            <p className="text-sm text-black/60 dark:text-white/60 mamad sara ease-in-out mb-3">
              {description?.slice(0, 100)} ...
            </p>
          </div>
          <div className="p-1 flex justify-between items-center w-full mt-3 mb-6">
            <div className="flex justify-start items-center gap-2">
              <FaRegUser />
              <span>{student?.length}</span>
            </div>
            <div className="flex justify-start items-center gap-2">
              <span>{price === 0 ? "Free" : price?.toLocaleString()}</span>
              {isFree || price === 0 ? null : <span>$</span>}
            </div>
          </div>
        </Link>
        {isLoading ? (
          <div className="w-full bg-gray-200 h-10 rounded-xl p-2 animate-pulse"></div>
        ) : (
          <div
            className="w-full bg-sky-500 rounded-xl p-2 text-center font-bold cursor-pointer"
            onClick={addToWishListHandler}
          >
            <span>Add To Wish List</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default CourseBox;
