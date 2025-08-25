"use client";
import React, { useEffect, useState } from "react";
import CourseFilter from "./courseFilter";
import CoursesContent from "./coursesContent";
import { usePathname, useSearchParams } from "next/navigation";
import { getCourseOfCategory } from "@/frontend/utils/course";
import { getAllWishList } from "@/lib/frontend/utils/wishList";

function CoursesInCategoryWrapper({ userId }) {
  const pathname = usePathname();
  const categoryId = pathname.split("/")[2];
  const [isLoading, setIsLOading] = useState(true);
  const searchParams = useSearchParams();
  const [courses, setCourses] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [filter, setFilter] = useState({
    title: "",
    priceFrom: null,
    priceTo: null,
  });

  useEffect(() => {
    const title = searchParams.get("title");
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    setFilter((prev) => ({
      ...prev,
      ...(title ? { title } : { title: "" }),
      ...(priceFrom ? { priceFrom: Number(priceFrom) } : {}),
      ...(priceTo ? { priceTo: Number(priceTo) } : {}),
    }));
  }, [searchParams]);

  useEffect(() => {}, [categoryId]);
  useEffect(() => {
    getCourseOfCategory(categoryId, setCourses, setIsLOading, filter);
    getAllWishList(setWishList, userId);
  }, [filter]);

  return (
    <div className="grid grid-cols-12 gap-5">
      <CourseFilter value={filter} setValue={setFilter} />
      <CoursesContent
        courses={courses}
        isLoading={isLoading}
        categoryId={categoryId}
        filter={filter}
        wishList={wishList}
      />
    </div>
  );
}

export default CoursesInCategoryWrapper;
