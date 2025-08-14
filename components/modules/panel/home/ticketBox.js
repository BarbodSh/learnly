import React from "react";

function TicketBox({ title, isAnswered, description }) {
  return (
    <div className="w-full bg-gray-200 dark:bg-primary-dark flex flex-col items-start justify-between p-5 rounded-lg gap-1">
      <div className="flex justify-between items-center w-full">
        <span>{title}</span>
        <span
          className={`p-2 ${isAnswered ? "text-green-500" : "text-red-500"}`}
        >
          {isAnswered ? "Confirmation" : "Waitting"}
        </span>
      </div>
      <div>
        <span>{description?.split(" ").slice(0, 8).join(" ")} ...</span>
      </div>
    </div>
  );
}

export default TicketBox;
