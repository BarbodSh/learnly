import Navbar from "@/modules/navbar/navbar";
import React from "react";
import { getUserInformation } from "@/lib/backend/utils/helper";
import { FaHome } from "react-icons/fa";
import { TbArrowBigRightLineFilled, TbVersionsOff } from "react-icons/tb";
import { TbArrowBigRightLinesFilled } from "react-icons/tb";
import Link from "next/link";
import Information from "@/components/templates/course/information";
import Content from "@/components/templates/course/content";
import connectToDB from "@/backend/configs/db";
import courseModel from "@/models/course";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import mongoose from "mongoose";
import NotFound from "@/app/not-found";
import { calculateScore } from "@/lib/frontend/utils/helper";
import Footer from "@/components/modules/footer/footer";
import { getWishlist } from "@/lib/backend/utils/wishList";
async function page({ params }) {
  params = await params;
  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NotFound();
  }

  await connectToDB();
  const resCourse = await courseModel
    .findOne({ _id: params.id }, "-__v")
    .populate("category")
    .populate("teacher")
    .populate("lesson")

    .populate({
      path: "comments",
      populate: [
        {
          path: "username",
          select: "username",
        },
        {
          path: "responder",
          select: "username role",
        },
      ],
    });

  if (!resCourse) {
    return NotFound();
  }

  const course = JSON.parse(JSON.stringify(resCourse));

  let averageScore = 5;
  if (course.comments.length > 0) {
    const trueComments = course.comments.filter(
      (comment) => comment.isShow === true
    );
    if (trueComments.length > 0) averageScore = calculateScore(course);
  }

  const resSimilarCourse = await courseModel.find({
    category: course.category,
  });
  const allSimilarCourse = JSON.parse(JSON.stringify(resSimilarCourse));
  const similarCourse = allSimilarCourse.filter(
    (similarCourse) => similarCourse._id !== course._id
  );
  const user = await getUserInformation();
  const wishList = await getWishlist(user._id);

  const isBuy = course.user.some((student) => student === user._id);

  return (
    <div className="min-h-screen flex flex-col justify-between items-center">
      <div>
        <Navbar isLogin={user} />
        <div className="mt-10 max-md:mt-5 mb-10">
          <div className="container">
            <div className="bg-white flex justify-start items-center shadow-lg gap-5 dark:bg-dark w-full p-3 rounded-2xl mb-5 mamad sara ease-in-out max-sm:gap-1">
              <Link href="/" aria-label="home-icon">
                <FaHome className="dark:text-white text-3xl max-sm:text-xl" />
              </Link>
              <div href="/">
                <TbArrowBigRightLineFilled className="dark:text-white text-xl max-sm:text-sm" />
              </div>
              <Link
                href="/courses"
                className="text-2xl dark:text-white font-bold max-sm:text-lg"
              >
                Courses
              </Link>
              <div href="/">
                <TbArrowBigRightLinesFilled className="dark:text-white text-xl max-sm:text-sm" />
              </div>
              <Link
                href="/courses"
                className="text-2xl dark:text-white font-bold max-sm:text-lg"
              >
                {course.category ? course.category.title : "none"}
              </Link>
              <div href="/">
                <TbArrowBigRightLinesFilled className="dark:text-white text-xl max-sm:text-sm" />
              </div>
              <Link
                href="#"
                className="text-2xl dark:text-white font-bold max-sm:text-lg"
              >
                {course.title}
              </Link>
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center gap-5 dark:text-white mamad sara ease-in-out w-full max-lg:flex-col-reverse">
                <div className="flex flex-col justify-between items-start bg-white dark:bg-dark shadow-lg rounded-xl p-5 mamad sara ease-in-out w-[50%] max-lg:w-full h-full xl:h-80">
                  <div>
                    <div className="flex justify-start items-center gap-3">
                      <h1 className="font-bold text-4xl mb-5 max-sm:text-3xl max-sm:mb-2">
                        {course.title}
                      </h1>
                      <div className="flex justify-start items-center">
                        {Array.from(
                          { length: averageScore },
                          (_, i) => i + 1
                        ).map((star, index) => (
                          <FaStar key={index} />
                        ))}
                        {Array.from(
                          { length: 5 - averageScore },
                          (_, i) => i + 1
                        ).map((star, index) => (
                          <FaRegStar key={index} />
                        ))}
                      </div>
                    </div>
                    <p className="opacity-60">{course.description}</p>
                  </div>
                  <div className="opacity-60">Laernly academy</div>
                </div>
                <div className="h-full w-[50%] max-lg:w-full">
                  <video
                    className="object-cover bg-white rounded-xl dark:bg-dark mamad sara ease-in-out w-full h-full xl:h-80"
                    src="/images/payton.webp"
                    poster={course.coverImage}
                    controls
                  ></video>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-5 mt-10 dark:text-white mamad sara ease-in-out">
              <Information
                courseId={course._id}
                courseTitle={course.title}
                amount={course.price}
                lessones={course.lesson}
                img={course.coverImage}
                isBuy={isBuy}
              />
              <Content
                course={course}
                teacher={course.teacher}
                username={user._id}
                averageScore={averageScore}
                similarCourse={similarCourse}
                wishList={wishList}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default page;
