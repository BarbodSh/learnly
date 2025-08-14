import React from "react";
import { FaBullseye } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { FaClock } from "react-icons/fa";
import { FaHandsHelping } from "react-icons/fa";
function About() {
  return (
    <section className="mb-20 dark:text-white">
      <div className="container">
        <h3 className="text-2xl font-bold mb-5">About Accademy</h3>
        <div className="flex justify-center items-center gap-5 flex-wrap">
          <div className="border-2 border-red-500 bg-white dark:bg-dark rounded-lg w-95 h-43 p-5">
            <FaBullseye className="text-5xl mr-auto ml-auto mb-2 text-red-500" />
            <p className=" text-center font-bold">
              Our courses are designed to match market needs, helping you reach
              your career goals faster.
            </p>
          </div>
          <div className="border-2 border-yellow-500 bg-white dark:bg-dark rounded-lg w-95 h-43 p-5">
            <FaChalkboardTeacher className="text-5xl mr-auto ml-auto mb-2 text-yellow-500" />
            <p className=" text-center font-bold">
              All lessons are taught by experienced professionals with
              real-world expertise.
            </p>
          </div>
          <div className="border-2 border-green-500 bg-white dark:bg-dark rounded-lg w-95 h-43 p-5">
            <FaLaptopCode className="text-5xl mr-auto ml-auto mb-2 text-green-500" />
            <p className=" text-center font-bold">
              You learn by building real projects that prepare you for the job
              market.
            </p>
          </div>
          <div className="border-2 border-blue-500 bg-white dark:bg-dark rounded-lg w-95 h-43 p-5">
            <FaClock className="text-5xl mr-auto ml-auto mb-2 text-blue-500" />
            <p className=" text-center font-bold">
              Learn at your own pace, with lifetime access to all your courses.
            </p>
          </div>
          <div className="border-2 border-purple-500 bg-white dark:bg-dark rounded-lg w-95 h-43 p-5">
            <FaHandsHelping className="text-5xl mr-auto ml-auto mb-2 text-purple-500" />
            <p className=" text-center font-bold">
              We support you throughout your learning journey and beyond.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
