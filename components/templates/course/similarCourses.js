import React from "react";
import CourseSwiper from "../homePage/courseSwiper";

function SimilarCourses({ status, similarCourse }) {
  return (
    <div className={`${status === "similarCourse" ? "block" : "hidden"}`}>
      {similarCourse.length > 0 ? (
        <CourseSwiper courses={similarCourse} slider={3} />
      ) : (
        <div className="text-center p-2 bg-red-500 rounded-2xl">
          This course has no similar courses.
        </div>
      )}
    </div>
  );
}

export default SimilarCourses;
