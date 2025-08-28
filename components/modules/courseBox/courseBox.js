"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import Link from "next/link";
import { motion } from "framer-motion";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
import { addToWishList, removeFromWishlist } from "@/frontend/utils/wishList";
import { allStatus } from "@/lib/frontend/utils/status";
import { useRouter } from "next/navigation";
import { RiLoaderFill } from "react-icons/ri";
function CourseBox({
  title,
  coverImage,
  user: student,
  price,
  description,
  isFree,
  _id,
  colspan,
  wishList,
  userId,
  isLoading,
  callBack,
}) {
  const [isWishlist, setIsWishlist] = useState(false);
  const [isLoadingForRemove, setIsLoadingForRemove] = useState(false);
  const [isLoadingForAdd, setIsLoadingForAdd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (wishList) {
      const inWishlist = wishList?.find((wish) => wish.course._id === _id);
      const inWishLists = wishList?.find((wish) => wish.course === _id);
      setIsWishlist(inWishlist || inWishLists || false);
    }
  }, [wishList, _id]);

  const addToWishListHandler = async () => {
    if (!userId) {
      return showErrorSwal("please lohin");
    }
    setIsLoadingForAdd(true);
    const res = await addToWishList(userId, _id);
    if (res.status === 200) {
      setIsWishlist(true);
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

  const removeFromWishListHandler = async () => {
    setIsLoadingForRemove(true);
    const res = await removeFromWishlist(_id, userId);
    if (res.status === 200) {
      setIsWishlist(false);
      setIsLoadingForRemove(false);
      router.refresh();
      return showSuccessSwal("course remove from wish list is successfully");
    }
    setIsLoadingForRemove(false);
    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <motion.div
      className={`${colspan} overflow-hidden rounded-xl shadow-lg flex flex-col justify-start items-start bg-white dark:bg-dark ease-in-out max-xl:col-span-4 max-lg:col-span-6 max-sm:col-span-12`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      whileHover={{ scale: 1.02, y: -15 }}
      viewport={{ once: true }}
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
    </motion.div>
  );
}

export default CourseBox;
