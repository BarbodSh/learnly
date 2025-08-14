import React, { Suspense } from "react";
import Link from "next/link";
import CoursesBoxLoading from "@/modules/courseBox/coursesBoxLoading";
import CourseBox from "@/modules/courseBox/courseBox";

async function Main({ courses }) {
  return (
    <section className="main mb-30">
      <div className="container">
        <div className="mt-20 flex justify-between items-center dark:text-white mamad sara ease-in-out">
          <div>
            <h3 className="text-2xl font-bold">Course</h3>
          </div>
          <Link href="/courses">
            <div className="bg-sky-500 p-3 rounded-xl">AllCourse</div>
          </Link>
        </div>
        <div className="grid grid-cols-12 justify-center items-center gap-5 mt-5">
          {courses?.slice(0, 8).map((course, index) => (
            <Suspense
              fallback={<CoursesBoxLoading col="col-span-3" />}
              key={index}
            >
              <CourseBox colspan={"col-span-3"} {...course} />
            </Suspense>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Main;
