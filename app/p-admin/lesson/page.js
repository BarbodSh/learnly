import React from "react";
import courseModel from "@/models/course";
import TableForLesson from "@/components/templates/p-admin/lesson/tableForLesson";
import LessonForm from "@/components/templates/p-admin/lesson/lessonForm";
import { getLesson } from "@/lib/backend/utils/lesson";
export const revalidate = 0;
async function page() {
  const resCourses = await courseModel.find({}, "title");
  const courses = JSON.parse(JSON.stringify(resCourses));
  const lesson = await getLesson();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <LessonForm courses={courses} />
        <TableForLesson lessones={lesson} />
      </div>
    </div>
  );
}

export default page;
