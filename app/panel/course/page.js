import { getUserInformation } from "@/lib/backend/utils/helper";
import React from "react";
import CourseBox from "@/modules/panel/course/courseBox";
import orderModel from "@/models/order";
import { getCourseOrder } from "@/lib/backend/utils/order";

async function page() {
  const user = await getUserInformation();

  const coursesOrder = await getCourseOrder(user._id);
  const allCoursesOrder = coursesOrder.flatMap((order) => order.course);
  return (
    <div className="p-5 dark:text-white">
      <div className="dark:bg-dark bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center items-center gap-2 flex-wrap">
        {allCoursesOrder.length > 0 ? (
          <>
            {allCoursesOrder.map((course) => (
              <CourseBox userID={user._id} key={course._id} {...course} />
            ))}
          </>
        ) : (
          <div className="w-full text-center p-2 rounded-lg bg-red-500">
            You don't have a buy course.
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
