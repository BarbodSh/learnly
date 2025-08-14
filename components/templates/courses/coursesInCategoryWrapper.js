"use client";
import React, { useEffect, useState } from "react";
import CourseFilter from "./courseFilter";
import CoursesContent from "./coursesContent";
import { usePathname } from "next/navigation";
import { getCourseOfCategory } from "@/frontend/utils/course";

function CoursesInCategoryWrapper() {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[2];
  const [isLoading, setIsLOading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    getCourseOfCategory(categoryId, setCourses, setIsLOading);
  }, [categoryId]);

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
        categoryId={categoryId}
        filter={filter}
      />
    </div>
  );
}

export default CoursesInCategoryWrapper;
