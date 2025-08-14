"use client";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi2";

function ContinueModal({ continueModal, setContinueModal, text }) {
  return (
    <div className="flex justify-center items-center">
      {continueModal === true ? (
        <div
          className="fixed top-0 left-0 right-0 z-30 flex justify-center items-center"
          onClick={() => {
            setContinueModal(false);
          }}
        >
          <div className="flex flex-col justify-center items-center bg-sky-500/60 p-10 gap-5 relative w-200">
            <HiOutlinePlus className="text-2xl rotate-45 absolute top-2 left-2 text-red cursor-pointer" />
            <p className="text-2xl">{text}</p>
            <div className="flex justify-center items-center gap-5">
              <div
                className="p-2 bg-green-500 w-20 text-center cursor-pointer"
                onClick={() => {
                  setContinueModal(false);
                }}
              >
                OK
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ContinueModal;
