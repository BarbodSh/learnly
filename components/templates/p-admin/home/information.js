import React from "react";
import { TiArrowRightThick } from "react-icons/ti";
import userModel from "@/models/user";
import orderModel from "@/models/order";
import Link from "next/link";
async function Information() {
  const resOrder = await orderModel
    .find({})
    .populate("user", "username")
    .sort({ _id: -1 });
  const resUser = await userModel.find({}, "username role").sort({ _id: -1 });

  const orders = JSON.parse(JSON.stringify(resOrder));
  const users = JSON.parse(JSON.stringify(resUser));

  return (
    <div className="grid grid-cols-12 justify-between content-center mt-5 gap-5">
      <div className="dark:bg-dark col-span-6 bg-white border-1 border-dark/20 dark:border-white/20 p-3 w-full h-80">
        <span className="mb-2 block">Order :</span>
        <table className="w-full text-sm">
          <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
            <tr className="">
              <th className="p-2">Number</th>
              <th>Name</th>
              <th>amount</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {orders?.slice(0, 4).map((order, index) => (
              <tr
                key={order._id}
                className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
              >
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2">
                  {order.user ? order.user.username : "-"}
                </td>
                <td className="p-2">
                  <div className="bg-sky-500/30 rounded-lg p-2">
                    {order.amount}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <div className="flex justify-between items-center"></div>
        </div>
      </div>
      <div className="dark:bg-dark col-span-6 bg-white border-1 border-dark/20 dark:border-white/20 p-3 w-full h-80">
        <span className="mb-2 block">User :</span>
        <table className="w-full text-sm">
          <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
            <tr className="">
              <th className="p-2">Number</th>
              <th>Name</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users?.slice(0, 4).map((user, index) => (
              <tr
                key={user._id}
                className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
              >
                <td className="p-2 text-center">{index + 1}</td>
                <td className="p-2">{user.username}</td>
                <td className="p-2">
                  <div className="bg-sky-500/30 rounded-lg p-2">
                    {user.role}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Information;
