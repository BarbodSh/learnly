import Navbar from "@/modules/navbar/navbar";
import React from "react";
import { FaHome } from "react-icons/fa";
import { TbArrowBigRightLineFilled } from "react-icons/tb";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import categoryModel from "@/models/category";
import Link from "next/link";
import { redirect } from "next/dist/server/api-utils";
import { notFound } from "next/navigation";
import CoursesInCategoryWrapper from "@/components/templates/courses/coursesInCategoryWrapper";
import Footer from "@/components/modules/footer/footer";
import { rules } from "@/lib/validator/rules";
import { getUserInformation } from "@/lib/backend/utils/helper";
async function page({ params }) {
  const param = await params;
  if (!rules.objectId.validate(param.slug)) {
    redirect(notFound());
    return;
  }
  const resCategory = await categoryModel.findOne({ _id: param.slug });
  const category = JSON.parse(JSON.stringify(resCategory));
  const res = await getUserInformation();
  const user = JSON.parse(JSON.stringify(res));
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Navbar slug={param.slug} />
      <div className="mt-20 max-md:mt-5 mb-30">
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
            <div>
              <TbArrowBigRightLinesFilled className="dark:text-white text-xl max-sm:text-sm" />
            </div>
            <Link
              href={`/courses/${category._id}`}
              className="text-2xl dark:text-white font-bold max-sm:text-lg"
            >
              {category.title}
            </Link>
            <div></div>
            <div></div>
          </div>
          <CoursesInCategoryWrapper userId={user._id} />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
