"use client";
import CourseBox from "@/modules/courseBox/courseBox";
import CoursesBoxLoading from "@/modules/courseBox/coursesBoxLoading";
import { getMe } from "@/frontend/utils/helper";
import React, { useEffect, useState } from "react";
import Pagination from "@/modules/pagination/pagination";
import usePagination from "@/hooks/pagination";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function CoursesContent({
  courses,
  isLoading: loadingForCourse,
  categoryId,
  filter,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mainPage = searchParams.get("page") || "1";
  const { totalPages, startIndex, endIndex } = usePagination(
    courses.length,
    6,
    mainPage
  );
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getMe(setUser, setIsLoading);
  }, []);

  useEffect(() => {
    if (mainPage !== "1") {
      if (categoryId) {
        return router.push(`/courses/${categoryId}?page=1`);
      }
      return router.push(`/courses?page=1`);
    }
  }, [filter, categoryId]);

  return (
    <>
      <div className="col-span-8 grid grid-cols-12 justify-center items-center gap-5 max-md:col-span-12">
        {loadingForCourse ? (
          Array.from({ length: 6 }, (_, i) => i + 1).map((arr, index) => (
            <CoursesBoxLoading key={index} />
          ))
        ) : courses?.length > 0 ? (
          courses
            ?.slice(startIndex, endIndex)
            .map((course) => (
              <CourseBox
                userID={user?.id}
                key={course._id}
                colspan={"col-span-4"}
                isLoading={isLoading}
                {...course}
              />
            ))
        ) : (
          <div className="col-span-12 h-full">
            <div className="text-center font-bold w-full bg-red-500 rounded-2xl p-2">
              we don't have course in this category
            </div>
          </div>
        )}
      </div>
      <div className="col-start-5 col-end-13 flex justify-center items-center gap-2">
        {loadingForCourse
          ? Array.from({ length: 3 }, (_, i) => i + 1).map((arr, index) => (
              <div
                key={index}
                className="size-8 animate-pulse bg-gray-300 rounded-lg"
              ></div>
            ))
          : categoryId
          ? totalPages.map((page, index) => (
              <Pagination
                key={index}
                href={`/courses/${categoryId}?page=${page}`}
                page={page}
                mainPage={mainPage}
              />
            ))
          : totalPages.map((page, index) => (
              <Pagination
                key={index}
                href={`/courses?page=${page}`}
                page={page}
                mainPage={mainPage}
              />
            ))}
      </div>
    </>
  );
}

export default CoursesContent;
