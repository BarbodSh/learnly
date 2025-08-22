import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaLaptopCode } from "react-icons/fa";
import { FaInfinity } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa";

function WhyChoose() {
  return (
    <section className="dark:text-white">
      <div className="container">
        <p className="text-2xl font-bold mb-5">Why choose learnly Accademy</p>
        <div className="grid grid-cols-12 justify-between content-center gap-5">
          <div className="col-span-6 h-20 p-2 rounded-lg bg-white dark:bg-dark border-2 border-red-500 flex justify-center items-center gap-5 max-lg:col-span-12">
            <FaChalkboardTeacher className="text-red-500 text-4xl" />
            <p className="text-xl font-bold">
              Learn from industry experts with years of hands-on experience.
            </p>
          </div>
          <div className="col-span-6 h-20 p-2 rounded-lg bg-white dark:bg-dark border-2 border-yellow-500 flex justify-center items-center gap-5 max-lg:col-span-12">
            <FaLaptopCode className="text-yellow-500 text-4xl" />
            <p className="text-xl font-bold">
              Gain real-world skills by building practical projects.
            </p>
          </div>
          <div className="col-span-6 h-20 p-2 rounded-lg bg-white dark:bg-dark border-2 border-green-500 flex justify-center items-center gap-5 max-lg:col-span-12">
            <FaInfinity className="text-green-500 text-4xl" />
            <p className="text-xl font-bold">
              Access all your courses anytime, forever — no deadlines.
            </p>
          </div>
          <div className="col-span-6 h-20 p-2 rounded-lg bg-white dark:bg-dark border-2 border-purple-500 flex justify-center items-center gap-5 max-lg:col-span-12">
            <FaUserTie className="text-purple-500 text-4xl" />
            <p className="text-xl font-bold">
              We help you build your resume and prepare for tech interviews.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChoose;
