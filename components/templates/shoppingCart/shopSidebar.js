"use client";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
import { order } from "@/lib/frontend/utils/shopingCart";
import { allStatus } from "@/lib/frontend/utils/status";
import { validateOrder } from "@/lib/validator/order";
import React, { useEffect, useState } from "react";

function ShopSidebar({ discunt, userID }) {
  const [cart, setCart] = useState([]);

  const total = cart.reduce((total, item) => total + item.amount, 0);
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

  const buyCourse = async () => {
    const coursesId = cart.map((course) => course.id);
    const amount = discunt === 0 ? total : (total * (100 - discunt)) / 100;
    const newOrder = {
      user: userID,
      course: coursesId,
      amount,
    };

    const validate = validateOrder(newOrder);
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    const res = await order(newOrder);
    const data = await res.json();
    if (res.status === 200) {
      showSuccessSwal("buy is successfully");
      localStorage.removeItem("cart");
      window.dispatchEvent(new Event("localStorageChanged"));
      return setCart([]);
    }
    if (res.status === 422) {
      return showErrorSwal(`${data.title} exist already`);
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <div className="bg-white dark:bg-dark p-5 border-1 border-dark/20 dark:border-white/20 mt-5 dark:text-white">
      <div className="border-b-1 border-gray-300 pb-3">
        <p className="font-bold text-2xl mb-3">Total shopping cart</p>
        <div className="flex justify-between items-center opacity-60">
          <p>Total number of periods :</p>
          <p>{cart.length}</p>
        </div>
      </div>
      <div className="flex justify-between items-center font-bold text-2xl mt-3">
        <p>Total price :</p>
        <p>{discunt === 0 ? total : (total * (100 - discunt)) / 100}$</p>
      </div>
      <div
        className="rounded-lg bg-sky-500 p-2 text-center text-xl font-bold mt-5 cursor-pointer"
        onClick={buyCourse}
      >
        Continue to checkout
      </div>
    </div>
  );
}

export default ShopSidebar;
