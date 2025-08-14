"use client";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
import { createComment } from "@/lib/frontend/utils/comment";
import { commentTextValidate } from "@/lib/validator/comment";
import { allStatus } from "@/lib/frontend/utils/status";
import { useRouter } from "next/navigation";

function CommentForm({ username, courseID }) {
  const [text, setText] = useState("");
  const [hoveredStar, setHoveredStar] = useState(5);
  const [selectedStar, setSelectedStar] = useState(5);
  const stars = [1, 2, 3, 4, 5];
  const router = useRouter();

  const sendComment = async (event) => {
    event.preventDefault();

    const textValidate = commentTextValidate(text);

    if (textValidate !== true) {
      return showErrorSwal(textValidate);
    }

    const newComment = {
      text,
      username,
      score: selectedStar,
      course: courseID,
    };

    const res = await createComment(newComment);

    if (res.status === 201) {
      showSuccessSwal("commect send is successfully");
      router.replace();
      return clearInput();
    }
    if (res.status === 422) {
      return showErrorSwal("user don't have buy this course");
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  const clearInput = () => {
    setText("");
  };
  return (
    <div>
      <form onSubmit={sendComment}>
        <div className="flex justify-start items-center gap-3">
          <span htmlFor="">send comment :</span>
          <div className="flex justify-start gap-1 text-3xl transition-all">
            {stars.map((star) => (
              <FaStar
                key={star}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(selectedStar)}
                onClick={() => setSelectedStar(star)}
                className={`text-lg cursor-pointer mamad duration-200 ${
                  (hoveredStar ?? selectedStar) >= star
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="border-2 border-sky-500 p-5 w-full rounded-lg resize-none outline-none mt-2"
          rows="5"
          placeholder="write note here ..."
        ></textarea>
        <button
          type="submit"
          className="p-2 border border-sky-500 rounded-lg w-40 text-center hover:bg-sky-500 cursor-pointer mt-2 transition duration-200 ease-in"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
