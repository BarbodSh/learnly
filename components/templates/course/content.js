"use client";
import React, { useState } from "react";
import { LuTimer } from "react-icons/lu";
import { MdOutlineContactSupport } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiCurrencyDollarSimple } from "react-icons/pi";
import { PiStudentBold } from "react-icons/pi";
import { LiaSortAmountUpAltSolid } from "react-icons/lia";
import Comment from "@/components/modules/comment/comment";
import CommentForm from "@/components/modules/comment/commentForm";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import SimilarCourses from "./similarCourses";
import { motion } from "framer-motion";
function Content({
  course,
  teacher,
  username,
  averageScore,
  similarCourse,
  wishList,
}) {
  const [menu, setMenu] = useState("Information");

  const trueComments = course.comments.filter(
    (comment) => comment.isShow === true
  );

  return (
    <div className="col-span-8 max-sm:col-span-12 ">
      <div className="bg-white mb-5 dark:bg-dark shadow-lg rounded-xl p-3 flex justify-start items-center gap-7  text-xl max-sm:text-lg font-bold mamad sara ease-in-out">
        <div className="relative cursor-pointer group">
          <span
            className={`before:absolute before:content-[''] before:h-1 before:w-0 before:bg-sky-500 before:rounded-2xl before:-bottom-1 before:left-0 group-hover:before:w-full before:transition-all before:duration-200 before:ease-in ${
              menu === "Information" ? "before:w-full" : "before:w-0"
            }`}
            onClick={() => setMenu("Information")}
          >
            Information
          </span>
        </div>
        <div className="relative cursor-pointer group">
          <span
            className={`before:absolute before:content-[''] before:h-1 before:w-0 before:bg-sky-500 before:rounded-2xl before:-bottom-1 before:left-0 group-hover:before:w-full before:transition-all before:duration-200 before:ease-in ${
              menu === "Comment" ? "before:w-full" : "before:w-0"
            }`}
            onClick={() => setMenu("Comment")}
          >
            Comment
          </span>
        </div>
        <div className="relative cursor-pointer group">
          <span
            className={`before:absolute before:content-[''] before:h-1 before:w-0 before:bg-sky-500 before:rounded-2xl before:-bottom-1 before:left-0 group-hover:before:w-full before:transition-all before:duration-200 before:ease-in ${
              menu === "similarCourse" ? "before:w-full" : "before:w-0"
            }`}
            onClick={() => setMenu("similarCourse")}
          >
            Similar Course
          </span>
        </div>
      </div>
      <motion.div
        className={`grid grid-cols-12 gap-5 w-full transition-all sara ease-in-out overflow-hidden ${
          menu === "Information" ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div className="col-span-4 flex justify-center items-center gap-3 p-5 rounded-lg shadow-lg bg-white dark:bg-dark mamad sara ease-in-out max-lg:col-span-6 max-sm:col-span-12">
          <LuTimer className="text-5xl" />
          <div>
            <span className="text-lg block">Date :</span>
            <span className="max-sm:text-lg">
              {course.createdAt.slice(0, 10)}
            </span>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center gap-3 p-5 rounded-lg shadow-lg bg-white dark:bg-dark mamad sara ease-in-out max-lg:col-span-6 max-sm:col-span-12">
          <MdOutlineContactSupport className="text-5xl" />
          <div>
            <span className="text-lg block">Suport :</span>
            <span className="max-sm:text-lg">{course.support}</span>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center gap-3 p-5 rounded-lg shadow-lg bg-white dark:bg-dark mamad sara ease-in-out max-lg:col-span-6 max-sm:col-span-12">
          <FaChalkboardTeacher className="text-5xl" />
          <div>
            <span className="text-lg block">Teacher :</span>
            <span className="max-sm:text-lg">
              {teacher ? teacher.name : "-"}
            </span>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center gap-3 p-5 rounded-lg shadow-lg bg-white dark:bg-dark mamad sara ease-in-out max-lg:col-span-6 max-sm:col-span-12">
          <PiCurrencyDollarSimple className="text-5xl" />
          <div>
            <span className="text-lg block">Amount :</span>
            <span className="max-sm:text-lg">
              {course.price === 0
                ? "Free"
                : course.price.toLocaleString() + " $"}
            </span>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center gap-3 p-5 rounded-lg shadow-lg bg-white dark:bg-dark mamad sara ease-in-out max-lg:col-span-6 max-sm:col-span-12">
          <PiStudentBold className="text-5xl" />
          <div>
            <span className="text-lg block">Student :</span>
            <span className="max-sm:text-lg">{course.user?.length}</span>
          </div>
        </div>
        <div className="col-span-4 flex justify-center items-center gap-3 p-5 rounded-lg shadow-lg bg-white dark:bg-dark mamad sara ease-in-out max-lg:col-span-6 max-sm:col-span-12">
          <LiaSortAmountUpAltSolid className="text-5xl" />
          <div>
            <span className="text-lg mb-1 block">Score :</span>
            <span className="max-sm:text-lg flex justify-center items-center">
              {" "}
              {Array.from({ length: averageScore }, (_, i) => i + 1).map(
                (star, index) => (
                  <FaStar key={index} />
                )
              )}
              {Array.from({ length: 5 - averageScore }, (_, i) => i + 1).map(
                (star, index) => (
                  <FaRegStar key={index} />
                )
              )}
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className={`bg-white dark:bg-dark mamad sara ease-in-out p-5 rounded-lg overflow-hidden ${
          menu === "Comment" ? "block" : "hidden"
        }`}
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <CommentForm username={username} courseID={course._id} />
        {trueComments?.length > 0 ? (
          <div className="mt-5 bg-white dark:bg-dark mamad sara ease-in-out p-5 rounded-lg flex flex-col justify-center items-start gap-4">
            {course.comments.map((comment) =>
              comment.isShow ? <Comment key={comment._id} {...comment} /> : null
            )}
          </div>
        ) : null}
      </motion.div>
      <SimilarCourses
        wishList={wishList}
        status={menu}
        similarCourse={similarCourse}
      />
    </div>
  );
}

export default Content;
