"use client";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

function RemoveModal({ remove, openRemoveModal, setOpenRemoveModal, title }) {
  return (
    <div className="dark:text-white">
      {openRemoveModal === true ? (
        <div className=" fixed top-0 left-0 right-0 z-40 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-sky-500/60 p-10 gap-5 relative">
            <HiOutlinePlus
              className="text-2xl rotate-45 absolute top-2 left-2 text-red cursor-pointer"
              onClick={() => {
                setOpenRemoveModal(false);
              }}
            />
            <p className="text-2xl">{title}</p>
            <div className="flex justify-center items-center gap-5">
              <div
                className="p-2 bg-green-500 w-20 text-center cursor-pointer"
                onClick={() => {
                  remove();
                  setOpenRemoveModal(false);
                }}
              >
                Yes
              </div>
              <div
                className="p-2 bg-red-500 w-20 text-center cursor-pointer"
                onClick={() => {
                  setOpenRemoveModal(false);
                }}
              >
                No
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default RemoveModal;
