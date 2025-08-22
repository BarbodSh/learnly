"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { addToWishList, removeFromWishlist } from "@/frontend/utils/wishList";
import { useRouter } from "next/navigation";
import { allStatus } from "@/frontend/utils/status";
import { motion } from "framer-motion";
import { RiLoaderFill } from "react-icons/ri";
function CourseBox({ userID, _id, title, description, coverImage, wishList }) {
  const [isLoadingForRemove, setIsLoadingForRemove] = useState(false);
  const [isLoadingForAdd, setIsLoadingForAdd] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const addToWishListHandler = async () => {
    if (!userID) {
      return showErrorSwal("please lohin");
    }
    setIsLoadingForAdd(true);
    const res = await addToWishList(userID, _id);
    if (res.status === 200) {
      setIsLoadingForAdd(false);
      router.refresh();
      return showSuccessSwal("course add to wish list");
    }
    if (res.status === 422) {
      setIsLoadingForAdd(false);
      return showErrorSwal("already exist");
    }
    setIsLoadingForAdd(false);
    const resStatus = allStatus(res);
    return resStatus;
  };

  useEffect(() => {
    if (wishList) {
      const inWishlist = wishList?.find((wish) => wish.course._id === _id);
      setIsWishlist(inWishlist || false);
    }
    setIsLoading(false);
  }, [wishList, _id]);

  const removeFromWishListHandler = async () => {
    setIsLoadingForRemove(true);
    const res = await removeFromWishlist(_id, userID);
    if (res.status === 200) {
      setIsLoadingForRemove(false);
      router.refresh();
      return showSuccessSwal("course remove from wish list is successfully");
    }
    setIsLoadingForRemove(false);
    const resStatus = allStatus(res);
    return resStatus;
  };
  return (
    <>
      <div className="flex h-80 flex-col bg-gray-200 dark:bg-primary-dark justify-center items-start rounded-lg overflow-hiddenw w-70 overflow-hidden">
        <Link className="h-[50%]" href={`/course/${_id}`}>
          <Image
            alt="course-box"
            src={coverImage}
            width={400}
            height={400}
          ></Image>
        </Link>
        <div className="p-3 h-[50%] w-full flex flex-col justify-between items-start">
          <Link
            href={`/course/${_id}`}
            className="flex flex-col justify-start items-start"
          >
            <h5 className="font-bold w-full pb-2 text-2xl">{title}</h5>
            <div className="opacity-60 text-sm">
              {description?.split(" ").slice(0, 5).join(" ")} ...
            </div>
          </Link>

          {isLoading ? (
            <div className="w-full bg-gray-200 h-10 rounded-xl p-2 animate-pulse"></div>
          ) : isWishlist ? (
            <div
              className="w-full bg-red-500 dark:bg-red-700 rounded-xl p-2 flex justify-center items-center font-bold cursor-pointer"
              onClick={removeFromWishListHandler}
            >
              {isLoadingForRemove ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                >
                  <RiLoaderFill className="text-2xl" />
                </motion.div>
              ) : (
                <span>Remove From Wish List</span>
              )}
            </div>
          ) : (
            <div
              className="w-full bg-sky-500 dark:bg-sky-700 rounded-xl p-2 flex justify-center items-center font-bold cursor-pointer"
              onClick={addToWishListHandler}
            >
              {isLoadingForAdd ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 1,
                    ease: "linear",
                  }}
                >
                  <RiLoaderFill className="text-2xl" />
                </motion.div>
              ) : (
                <span>Add To Wish List</span>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CourseBox;
