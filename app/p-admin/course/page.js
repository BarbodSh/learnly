import React from "react";
import userModel from "@/models/user";
import TableForCourse from "@/templates/p-admin/course/tableForCourse";
import CourseForm from "@/templates/p-admin/course/courseForm";
import { getCourseForAdmin } from "@/backend/utils/course";
import { getCatgory } from "@/lib/backend/utils/category";
export const revalidate = 0;
async function page() {
  const resUsers = await userModel.find({ role: "admin" }, "username");

  const courses = await getCourseForAdmin();
  const teachers = JSON.parse(JSON.stringify(resUsers));
  const categories = await getCatgory();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <CourseForm categories={categories} teachers={teachers} />
        <TableForCourse courses={courses} />
      </div>
    </div>
  );
}

export default page;
