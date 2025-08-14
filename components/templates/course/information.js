"use client";
import React, { useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiLock } from "react-icons/ci";
import { CiUnlock } from "react-icons/ci";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
function Information({ courseId, courseTitle, amount, lessones, img, isBuy }) {
  const [openAccordian, setOpenAccordian] = useState(false);
  const accordian = useRef(null);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isInCart = cart.some((course) => course.id === courseId);
    if (isInCart) {
      showErrorSwal("already exist in cart");
      return false;
    }
    const cartItem = {
      id: courseId,
      title: courseTitle,
      amount,
      img,
    };
    cart.push(cartItem);
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("localStorageChanged"));
    showSuccessSwal("add course in cart successfully");
  };

  return (
    <div className="col-span-4 max-sm:col-span-12">
      <div className="bg-white dark:bg-dark shadow-lg rounded-xl mamad sara ease-in-out p-5 mb-5 ">
        {isBuy ? (
          <div className="flex justify-center items-center rounded-lg bg-sky-500 p-2 text-2xl font-bold">
            Course purchased
          </div>
        ) : (
          <div
            className="flex justify-center items-center rounded-lg bg-red-500 p-2 text-2xl font-bold cursor-pointer"
            onClick={addToCart}
          >
            Add to cart
          </div>
        )}
      </div>
      <div className="bg-white dark:bg-dark shadow-lg rounded-xl mamad sara ease-in-out p-5 mb-5">
        <div
          className={` relative p-3 flex justify-between items-center text-lg cursor-pointer ${
            openAccordian
              ? "bg-sky-500 rounded-t-lg"
              : "bg-sky-500/20 rounded-lg"
          }`}
          onClick={() => setOpenAccordian(!openAccordian)}
        >
          <span className="">Lesson</span>
          <IoIosArrowDown
            className={`transition-all duration-200 ease-in ${
              openAccordian ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>
        <div
          ref={accordian}
          style={{
            maxHeight: openAccordian
              ? `${accordian.current?.scrollHeight}px`
              : "0px",
          }}
          className="dark:bg-primary-dark bg-gray-300 overflow-hidden rounded-b-lg transition-all duration-200 ease-in"
        >
          <ul className="flex flex-col justify-center items-start gap-5 p-5">
            {lessones.length > 0 ? (
              lessones.map((lesson, index) => (
                <li
                  key={lesson._id}
                  className="flex justify-between items-center w-full"
                >
                  <div className="flex justify-start items-center gap-1">
                    <span className="size-7 rounded-lg flex justify-center items-center">
                      {index + 1} -
                    </span>
                    <span>{lesson.title}</span>
                  </div>
                  {isBuy ? (
                    <CiUnlock className="text-2xl text-sky-500" />
                  ) : lesson.isFree ? (
                    <CiUnlock className="text-2xl text-sky-500" />
                  ) : (
                    <CiLock className="text-2xl text-red-500" />
                  )}
                </li>
              ))
            ) : (
              <li className="bg-red-500 w-full text-center rounded-2xl p-1">
                This course has no lessons.
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="bg-white dark:bg-dark shadow-lg rounded-xl mamad sara ease-in-out p-5">
        <p className="mb-5">Course progress :</p>
        <div className="bg-sky-500/20 overflow-hidden relative w-flul h-2 rounded-full before:absolute before:content-[''] before:top-0 before:h-full before:w-[50%] before:bg-sky-500"></div>
      </div>
    </div>
  );
}

export default Information;
