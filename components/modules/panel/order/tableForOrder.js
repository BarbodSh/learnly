"use client";
import React from "react";
function TableForOrder({ order }) {
  return (
    <>
      <table className="w-full text-sm">
        <thead className="text-xs uppercase bg-gray-200 dark:bg-gray-700">
          <tr className="">
            <th className="p-2">Number</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {order.map((or, index) => (
            <tr
              key={or._id}
              className="bg-white border-b-1 dark:bg-dark dark:border-white/40 border-dark/40 hover:bg-gray-100 dark:hover:bg-gray-600 p-5"
            >
              <td className="p-2 text-center">{index + 1}</td>
              <td className="p-2">{or.createdAt.slice(0, 10)}</td>
              <td className="p-2">{or.amount}</td>

              <td className="p-2">
                <div
                  className="p-1 rounded-lg bg-sky-500 transition duration-200 ease-in"
                  onClick={() => setContinueModal(true)}
                >
                  completed
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TableForOrder;
