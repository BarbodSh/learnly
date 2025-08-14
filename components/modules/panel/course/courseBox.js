"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { addToWishList } from "@/frontend/utils/wishList";
function CourseBox({ userID, _id, title, description, coverImage }) {
  const addToWishListHandler = async () => {
    const res = await addToWishList(userID, _id);
    if (res.status === 200) {
      return showSuccessSwal("course add to wish list");
    }
    if (res.status === 422) {
      return showErrorSwal("already exist");
    }

    const resStatus = allStatus(res);
    return resStatus;
  };
  return (
    <>
      <div className="flex flex-col bg-gray-200 dark:bg-primary-dark justify-center items-start rounded-lg overflow-hiddenw w-70 overflow-hidden">
        <Link href={`/course/${_id}`}>
          <Image
            alt="course-box"
            src={coverImage}
            width={400}
            height={400}
          ></Image>
        </Link>
        <div className="p-3 w-full">
          <Link href={`/course/${_id}`}>
            <h5 className="font-bold w-full pb-2 text-2xl">{title}</h5>
            <div className="border-b-1 pb-2 border-dark/20 dark:border-white/20 opacity-60 text-sm">
              {description?.split(" ").slice(0, 5).join(" ")} ...
            </div>
          </Link>
          <div
            className="bg-sky-500 p-2 rounded-lg mt-3 text-center font-bold cursor-pointer"
            onClick={addToWishListHandler}
          >
            Add to wish list
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseBox;
