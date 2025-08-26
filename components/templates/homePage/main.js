import React from "react";
import Link from "next/link";
import CourseBox from "@/modules/courseBox/courseBox";

async function Main({ courses, wishList, user }) {
  return (
    <section className="main mb-30">
      <div className="container">
        <div className="mt-20 flex justify-between items-center dark:text-white mamad sara ease-in-out">
          <div>
            <h3 className="text-3xl font-bold">Course</h3>
          </div>
          <Link href="/courses">
            <div className="bg-sky-700 p-3 rounded-xl">AllCourse</div>
          </Link>
        </div>
        <div className="grid grid-cols-12 justify-center items-center gap-7 mt-8">
          {courses?.slice(0, 8).map((course) => (
            <CourseBox
              key={course._id}
              colspan={"col-span-3"}
              {...course}
              wishList={wishList}
              userId={user?._id}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Main;
