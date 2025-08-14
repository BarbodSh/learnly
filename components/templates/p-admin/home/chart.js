"use client";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ReactChart from "./reactChart";

function Chart() {
  return (
    <div className="dark:bg-dark col-span-6 bg-white border-1 border-dark/20 dark:border-white/20 p-5 mt-5">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{
          delay: 3000,
        }}
        speed={2000}
        spaceBetween={0}
        pagination={{ clickable: true }}
        slidesPerView={1}
      >
        <SwiperSlide>
          <ReactChart />
        </SwiperSlide>
        <SwiperSlide>
          <ReactChart />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Chart;
