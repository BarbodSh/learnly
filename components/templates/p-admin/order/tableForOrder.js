import React from "react";

function TableForOrder({ orders }) {
  return (
    <table className="w-full text-sm">
      <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
        <tr className="">
          <th className="p-2">Number</th>
          <th>Name</th>
          <th>amount</th>
          <th>date</th>
        </tr>
      </thead>
      <tbody className="text-center">
        {orders.map((order, index) => (
          <tr
            key={order._id}
            className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
          >
            <td className="p-2">{index + 1}</td>
            <td className="p-2">{order.user ? order.user.username : "-"}</td>
            <td className="p-2">{order.amount}</td>
            <td className="p-2">{order.createdAt.slice(0, 10)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TableForOrder;
