"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
function InformationAboutItem({ useDiscunt }) {
  const [cart, setCart] = useState([]);
  const [discunt, setDiscunt] = useState("");

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
    <div className="bg-white dark:bg-dark p-5 border-1 border-dark/20 dark:border-white/20 mt-5">
      {cart?.length > 0 ? (
        <table className="w-full text-sm dark:text-white mb-10">
          <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
            <tr className="">
              <th className="p-2">Number</th>
              <th className="p-2">img</th>
              <th className="p-2">course</th>
              <th className="p-2">Amount</th>
              <th className="p-2">remove</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {cart.map((course, index) => (
              <tr
                key={course.id}
                className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
              >
                <td>{index + 1}</td>
                <td className="p-2 flex justify-center items-center">
                  <Image
                    alt="img-course"
                    src={course.img}
                    width={200}
                    height={200}
                    className="w-25 h-15"
                  />
                </td>
                <td className="p-2">{course.title}</td>
                <td className="p-2">{course.amount}</td>
                <td className="p-2">
                  <div
                    className="border-1 border-red-500 hover:bg-red-500 transition-all duration-200 ease-in rounded-lg p-2 cursor-pointer"
                    onClick={() => removeItemInCart(course.id)}
                  >
                    remove
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="p-2 flex justify-center items-center bg-red-500 rounded-2xl">
          You don't have product in shopping cart
        </div>
      )}
      <div>
        <form
          onSubmit={(event) => {
            event.preventDefault();
            useDiscunt(discunt);
          }}
          action=""
          className="mt-5 dark:text-white dark:placeholder:text-white"
        >
          <input
            type="text"
            placeholder="discunt code ..."
            className="p-2 rounded-2xl border-1 border-sky-500 outline-none"
            onChange={(event) => setDiscunt(event.target.value)}
            value={discunt}
          />
          <button className="p-2 bg-sky-500 rounded-lg ml-5 cursor-pointer font-bold">
            apply discount
          </button>
        </form>
      </div>
    </div>
  );
}

export default InformationAboutItem;
