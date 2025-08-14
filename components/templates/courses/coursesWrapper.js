"use client";
import React, { useEffect, useState } from "react";
import CourseFilter from "./courseFilter";
import CoursesContent from "./coursesContent";
import { getCourse } from "@/frontend/utils/course";

function CoursesWrapper() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getCourse(setCourses, setIsLoading);
  }, []);

  const getFilteredCourses = () => {
    switch (filter) {
      case "Free":
        return courses.filter((course) => course.price === 0);
      case "Premium":
        return courses.sort((a, b) => b.price - a.price);
      case "Cheap":
        return courses.sort((a, b) => a.price - b.price);
      case "Random":
        return courses.sort(() => 0.5 - Math.random());
      default:
        return courses;
    }
  };

  const filteredCourses = getFilteredCourses();

  return (
    <div className="grid grid-cols-12 gap-5">
      <CourseFilter value={filter} setValue={setFilter} />
      <CoursesContent
        courses={filteredCourses}
        isLoading={isLoading}
        filter={filter}
      />
    </div>
  );
}

export default CoursesWrapper;
