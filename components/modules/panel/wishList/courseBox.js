"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { showSuccessSwal } from "@/frontend/utils/helper";
import { removeFromWishlist } from "@/frontend/utils/wishList";
import { allStatus } from "@/frontend/utils/status";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { RiLoaderFill } from "react-icons/ri";
function CourseBox({ userID, _id, title, description, coverImage }) {
  const [isLoadingForRemove, setIsLoadingForRemove] = useState(false);
  const router = useRouter();

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
      <div className="flex flex-col h-80 bg-gray-200 dark:bg-primary-dark justify-center items-start rounded-lg overflow-hiddenw w-70 overflow-hidden">
        <Link className="h-[50%]" href={`/course/${_id}`}>
          <Image
            alt="course-box"
            src={coverImage}
            width={400}
            height={400}
          ></Image>
        </Link>
        <div className="p-3 h-[50%] w-full flex flex-col justify-between items-center">
          <Link href={`/course/${_id}`}>
            <h5 className="font-bold w-full pb-2 text-2xl">{title}</h5>
            <div className="opacity-60 text-sm">
              {description?.split(" ").slice(0, 5).join(" ")} ...
            </div>
          </Link>
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
        </div>
      </div>
    </>
  );
}

export default CourseBox;
