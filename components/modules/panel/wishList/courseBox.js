"use client";
import React, { useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import RemoveModal from "@/modules/removeModal/removeModal";
import Link from "next/link";
import { showSuccessSwal } from "@/frontend/utils/helper";
import { removeFromWishlist } from "@/frontend/utils/wishList";
import { allStatus } from "@/frontend/utils/status";

function CourseBox({ userID, _id, title, description, coverImage }) {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);

  const removeFromWishListHandler = async () => {
    const res = await removeFromWishlist(_id, userID);
    if (res.status === 200) {
      showSuccessSwal("course remove from wish list is successfully");
      return redirect("/panel/wishList");
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
            className="bg-red-500 p-2 rounded-lg mt-3 text-center font-bold cursor-pointer"
            onClick={() => {
              setOpenRemoveModal(true);
            }}
          >
            Remove
          </div>
        </div>
      </div>
      <RemoveModal
        remove={removeFromWishListHandler}
        openRemoveModal={openRemoveModal}
        setOpenRemoveModal={setOpenRemoveModal}
        title={"Are you sure about deleting?"}
      />
    </>
  );
}

export default CourseBox;
