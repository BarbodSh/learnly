"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { PiTrashSimpleThin } from "react-icons/pi";
import Image from "next/image";
function Bagbox({ bagModal }) {
  const [cart, setCart] = useState([]);

  const getCartItem = () => {
    const cartInLocal = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartInLocal);
  };
  useEffect(() => {
    getCartItem();
    const handleStorageChange = () => getCartItem();
    window.addEventListener("localStorageChanged", handleStorageChange);

    return () => {
      window.removeEventListener("localStorageChanged", handleStorageChange);
    };
  }, []);

  const removeItemInCart = (id) => {
    const removeItem = cart.filter((item) => item.id !== id);
    setCart(removeItem);
    localStorage.setItem("cart", JSON.stringify(removeItem));
    window.dispatchEvent(new Event("localStorageChanged"));
  };
  return (
    <>
      <div
        className={`absolute z-40 top-25  max-lg:top-22 right-40  max-lg:right-1 rounded-lg w-70 p-3 bg-white flex dark:bg-dark transition-all duration-200 ease-in max-h-70 ${
          bagModal === true
            ? "max-h-80 opacity-100 visible"
            : "max-h-0 opacity-0 invisible"
        } `}
      >
        <ul className="dark:text-white flex flex-col gap-2 justify-start items-start w-full">
          <div className="cart-container flex flex-col gap-2 justify-start items-start w-full overflow-y-auto">
            {cart?.length > 0 ? (
              cart.map((course) => (
                <li
                  key={course.id}
                  className="flex justify-between items-center w-full gap-5"
                >
                  <div className="h-15 w-25 rounded-lg">
                    {course?.img && (
                      <Image
                        src={course.img}
                        width={400}
                        height={400}
                        alt={course.title}
                        className="h-15 w-25 object-cover"
                      />
                    )}
                  </div>
                  <div className="flex flex-col justify-center items-start">
                    <span className="text-lg font-bold">{course.title}</span>
                    <span>{course.amount.toLocaleString()} $</span>
                  </div>
                  <PiTrashSimpleThin
                    className="text-2xl text-red-500 cursor-pointer"
                    onClick={() => removeItemInCart(course.id)}
                  />
                </li>
              ))
            ) : (
              <li className="text-red-500 w-full text-center">
                you dont have course in cart
              </li>
            )}
          </div>
          {cart?.length > 0 ? (
            <Link href="/shoppingCart" className="w-full mt-3">
              <div className="rounded-lg bg-sky-500 p-2 w-full text-center cursor-pointer">
                View shopping cart
              </div>
            </Link>
          ) : null}
        </ul>
      </div>
    </>
  );
}

export default Bagbox;
