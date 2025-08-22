import React from "react";
import CourseBox from "@/modules/panel/course/courseBox";
import connectToDB from "@/backend/configs/db";
import { getCourseOrder } from "@/lib/backend/utils/order";

async function Course({ userID, wishList }) {
  await connectToDB();
  const orders = await getCourseOrder(userID);
  const allCourses = orders.flatMap((order) => order.course);

  return (
    <div className="bg-white dark:bg-dark p-5 border-1 border-dark/20 dark:border-white/20 mt-5">
      <div className="flex justify-between items-center w-full">
        <span className="text-lg">Last Courses:</span>
      </div>
      <div className="flex justify-center items-center gap-3 mt-3">
        {allCourses?.length > 0 ? (
          allCourses
            .slice(-3)
            .map((course, index) => (
              <CourseBox
                userID={userID}
                key={course._id}
                {...course}
                wishList={wishList}
              />
            ))
        ) : (
          <div className="w-full p-2 bg-red-500 text-center rounded-lg">
            You don't have a course.
          </div>
        )}
      </div>
    </div>
  );
}

export default Course;
