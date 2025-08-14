import Navbar from "@/modules/navbar/navbar";
import React from "react";
import { getUserInformation } from "@/backend/utils/helper";
import { FaHome } from "react-icons/fa";
import { TbArrowBigRightLineFilled } from "react-icons/tb";
import Link from "next/link";

import CoursesWrapper from "@/components/templates/courses/coursesWrapper";
import Footer from "@/components/modules/footer/footer";
async function page() {
  const res = await getUserInformation();
  const user = JSON.parse(JSON.stringify(res));
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar isLogin={user} />
      <div className="mt-20 max-md:mt-5 mb-30 ">
        <div className="container">
          <div className="bg-white flex justify-start items-center shadow-lg gap-5 dark:bg-dark w-full p-3 rounded-2xl mb-5 mamad sara ease-in-out max-sm:gap-1">
            <Link href="/">
              <FaHome className="dark:text-white text-3xl max-sm:text-xl" />
            </Link>
            <div>
              <TbArrowBigRightLineFilled className="dark:text-white text-xl max-sm:text-sm" />
            </div>
            <Link
              href="/courses"
              className="text-2xl dark:text-white font-bold max-sm:text-lg"
            >
              Courses
            </Link>
          </div>
          <CoursesWrapper />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
