import React from "react";
import { PiBooksLight } from "react-icons/pi";
import { PiBookmarksLight } from "react-icons/pi";
import { IoTicketOutline } from "react-icons/io5";
import { TfiCommentAlt } from "react-icons/tfi";
function Navigation({
  wishListAmount,
  courseAmount,
  ticketAmount,
  commentAmount,
}) {
  return (
    <div className="bg-white dark:bg-dark p-5 border-1 border-dark/20 dark:border-white/20 flex justify-between items-center">
      <div className="flex justify-start items-center gap-3">
        <PiBooksLight className="text-5xl" />
        <div>
          <div className="flex justify-start items-center gap-2">
            <span>Course:</span>
            <span>{courseAmount}</span>
          </div>
          <div className="opacity-60 text-sm">Course</div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-3">
        <IoTicketOutline className="text-5xl" />
        <div>
          <div className="flex justify-start items-center gap-2">
            <span>Ticket:</span>
            <span>{ticketAmount}</span>
          </div>
          <div className="opacity-60 text-sm">Ticket</div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-3">
        <TfiCommentAlt className="text-5xl" />
        <div>
          <div className="flex justify-start items-center gap-2">
            <span>Comment:</span>
            <span>{commentAmount}</span>
          </div>
          <div className="opacity-60 text-sm">Comment</div>
        </div>
      </div>
      <div className="flex justify-start items-center gap-3">
        <PiBookmarksLight className="text-5xl" />
        <div>
          <div className="flex justify-start items-center gap-2">
            <span>Mark:</span>
            <span>{wishListAmount}</span>
          </div>
          <div className="opacity-60 text-sm">Mark</div>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
