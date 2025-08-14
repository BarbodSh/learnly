"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CourseSwiper from "./courseSwiper";
import { getCourse } from "@/lib/frontend/utils/course";

function CourseSwipperIsClient() {
  const [course, setCourse] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCourse(setCourse, setIsLoading);
  }, []);
  return (
    <div>
      <CourseSwiper
        courses={course}
        title={"Favorite title"}
        slider={4}
        isLoading={isLoading}
      />
    </div>
  );
}

export default CourseSwipperIsClient;
