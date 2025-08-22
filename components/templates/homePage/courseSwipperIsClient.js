"use client";
import React, { useEffect, useState } from "react";
import CourseSwiper from "./courseSwiper";
import { getCourse } from "@/lib/frontend/utils/course";

function CourseSwipperIsClient({ wishList }) {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCourse(setCourse, setIsLoading);
  }, []);
  return (
    <div>
      <CourseSwiper
        wishList={wishList}
        courses={course}
        title={"Favorite title"}
        slider={4}
        isLoading={isLoading}
      />
    </div>
  );
}

export default CourseSwipperIsClient;
