"use client";
import React, { useEffect, useState } from "react";
import CourseFilter from "./courseFilter";
import CoursesContent from "./coursesContent";
import { getCourse } from "@/frontend/utils/course";
import { useSearchParams } from "next/navigation";
import { getAllWishList } from "@/lib/frontend/utils/wishList";

function CoursesWrapper({ userId }) {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [wishList, setWishList] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const title = searchParams.get("title") || "";
    const priceFrom = searchParams.get("priceFrom") || "";
    const priceTo = searchParams.get("priceTo") || "";

    getCourse(setCourses, setIsLoading, { title, priceFrom, priceTo });
    getAllWishList(setWishList, userId);
  }, [searchParams]);

  return (
    <div className="grid grid-cols-12 gap-5">
      <CourseFilter />
      <CoursesContent
        courses={courses}
        isLoading={isLoading}
        wishList={wishList}
      />
    </div>
  );
}

export default CoursesWrapper;
