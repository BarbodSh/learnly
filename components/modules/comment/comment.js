import React from "react";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
function Comment({
  text,
  username,
  isAnswered,
  date,
  score,
  textresponse,
  responder,
}) {
  return (
    <div className="p-5 bg-gray-300 dark:bg-primary-dark mamad sara ease-in-out rounded-lg w-full">
      <div className="sender">
        <div className="border-b-1 border-dark/30 dark:border-white/60 flex justify-start items-center gap-3">
          <div className="size-13 bg-dark dark:bg-white rounded-full mb-3"></div>
          <div className="mb-3">
            <div className="flex justify-start items-center gap-3">
              <span>{username.username}</span>
              <div className="flex justify-start items-center">
                {Array.from({ length: score }, (_, i) => i + 1).map(
                  (star, index) => (
                    <FaStar key={index} className="text-sm" />
                  )
                )}
                {Array.from({ length: 5 - score }, (_, i) => i + 1).map(
                  (star, index) => (
                    <FaRegStar key={index} className="text-sm" />
                  )
                )}
              </div>
            </div>
            <p>{date.slice(0, 10)}</p>
          </div>
        </div>
        <div className="mt-2">{text}</div>
      </div>
      {isAnswered === true ? (
        <div className="responser w-[93%] mr-auto ml-auto rounded-lg mt-10 p-3 bg-sky-500/60 dark:bg-sky-700/60">
          <div className="border-b-1 border-dark/40 dark:border-white flex justify-start items-center gap-3">
            <div className="size-13 bg-dark dark:bg-white rounded-full mb-3"></div>
            <div className="mb-3">
              <p>{responder?.username}</p>
              <p>{responder?.role}</p>
            </div>
          </div>
          <div className="mt-3">{textresponse}</div>
        </div>
      ) : null}
    </div>
  );
}

export default Comment;
