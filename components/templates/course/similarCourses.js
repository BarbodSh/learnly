"use client";
import React from "react";
import CourseSwiper from "../homePage/courseSwiper";
import { motion } from "framer-motion";

function SimilarCourses({ status, similarCourse, wishList }) {
  return (
    <motion.div
      className={`${status === "similarCourse" ? "block" : "hidden"} mt-3 `}
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {similarCourse?.length > 0 ? (
        <CourseSwiper wishList={wishList} courses={similarCourse} slider={3} />
      ) : (
        <div className="text-center p-2 bg-red-500 rounded-2xl">
          This course has no similar courses.
        </div>
      )}
    </motion.div>
  );
}

export default SimilarCourses;
