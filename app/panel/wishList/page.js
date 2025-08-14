import { getUserInformation } from "@/backend/utils/helper";
import React from "react";
import CourseBox from "@/modules/panel/wishList/courseBox";
import { getWishlist } from "@/backend/utils/wishList";

async function page() {
  const user = await getUserInformation();

  const wishList = await getWishlist(user._id);
  return (
    <div className="p-5 dark:text-white">
      <div className="dark:bg-dark bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center items-center gap-2 flex-wrap">
        {wishList.length > 0 ? (
          <>
            {wishList.map((courses) => (
              <CourseBox
                key={courses.course._id}
                title={courses.course.title}
                description={courses.course.description}
                coverImage={courses.course.coverImage}
                userID={user._id}
                _id={courses.course._id}
              />
            ))}
          </>
        ) : (
          <div className="w-full text-center p-2 rounded-lg bg-red-500">
            You don't have a course in wish list.
          </div>
        )}
      </div>
    </div>
  );
}

export default page;
