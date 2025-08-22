"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import CourseBox from "@/modules/courseBox/courseBox";
import Link from "next/link";
import CoursesBoxLoading from "@/components/modules/courseBox/coursesBoxLoading";

function CourseSwiper({ courses, title, slider, isLoading, wishList }) {
  return (
    <section className="mb-30">
      <div className="container">
        {title ? (
          <div className="mt-20 flex justify-between items-center dark:text-white mamad sara ease-in-out mb-3">
            <div>
              <h3 className="text-2xl font-bold">{title}</h3>
            </div>
            <Link href="/courses">
              <div className="bg-sky-700 p-3 rounded-xl">AllCourse</div>
            </Link>
          </div>
        ) : null}
        <Swiper
          className=" !bg-gray-200 !shadow-none dark:!bg-primary-dark"
          aria-live="polite"
          modules={[Autoplay]}
          loop={slider < courses?.length && true}
          autoplay={{
            delay: 2000,
          }}
          speed={2000}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: slider,
            },
          }}
        >
          {isLoading ? (
            <div className="grid grid-cols-12 gap-5">
              {Array.from({ length: 4 }, (_, i) => i + 1).map((arr, index) => (
                <CoursesBoxLoading col={"col-span-3"} key={index} />
              ))}
            </div>
          ) : (
            courses?.map((course) => (
              <SwiperSlide>
                <CourseBox key={course._id} {...course} wishList={wishList} />
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default CourseSwiper;
