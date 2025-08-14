"use client";
import React, { useEffect, useRef } from "react";
import { HiOutlinePlus } from "react-icons/hi2";

function SendModal({ continueModal, setContinueModal, value, setValue, send }) {
  const inputRef = useRef();
  useEffect(() => {
    if (continueModal && inputRef.current) {
      inputRef.current.focus();
    }
  }, [continueModal]);
  return (
    <div className="flex justify-center items-center">
      {continueModal === true ? (
        <div className="fixed top-0 left-0 right-0 z-30 flex justify-center items-center">
          <div className="flex flex-col justify-center items-center bg-sky-500/60 p-10 gap-5 relative">
            <HiOutlinePlus className="text-2xl rotate-45 absolute top-2 left-2 text-red cursor-pointer" />
            <textarea
              ref={inputRef}
              className="p-2 outline-none border-1 border-white rounded-lg resize-none w-100 text-lg"
              placeholder="write text ..."
              rows={10}
              type="text"
              value={value}
              onChange={(event) => {
                setValue(event.target.value);
              }}
            />
            <div className="flex justify-center items-center gap-5 ">
              <div
                className="p-2 bg-green-500 w-20 text-center cursor-pointer"
                onClick={() => {
                  send();
                  setContinueModal(false);
                }}
              >
                Send
              </div>
              <div
                className="p-2 bg-red-500 w-20 text-center cursor-pointer"
                onClick={() => {
                  setContinueModal(false);
                }}
              >
                Close
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default SendModal;
