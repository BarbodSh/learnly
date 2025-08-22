"use client";
import { CiPlay1 } from "react-icons/ci";
import { motion } from "framer-motion";
function Header() {
  return (
    <section className="header mt-15">
      <div className="container">
        <motion.div
          className="flex justify-center items-center gap-10 max-md:flex-col-reverse"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <div className=" w-120 -rotate-10 mt-20 rounded-4xl bg-white animate-float dark:bg-dark shadow-xl p-7 mamad sara ease-in-out max-md:mt-10 max-sm:w-80">
            <div className="animate-pulse w-full grid grid-cols-12 justify-between gap-3 h-full">
              <div className="col-span-8 flex flex-col gap-3 bg-gray-300 rounded-lg p-3">
                <div className="flex justify-center gap-3 items-center">
                  <div className="rounded-lg size-10 bg-red-400"></div>
                  <div className="rounded-lg size-10 bg-yellow-400"></div>
                  <div className="rounded-lg size-10 bg-green-400"></div>
                  <div className="rounded-lg size-10 bg-sky-400"></div>
                </div>
                <div className="bg-white h-full w-full rounded-lg p-3 flex flex-col items-start justify-between">
                  <div className="flex justify-between items-center border-b-1 border-gray-300 p-1 w-full">
                    <div className="h-2 w-15 rounded-2xl bg-gray-300 mb-1"></div>
                    <div className="h-2 w-3 bg-red-400 rounded-lg"></div>
                  </div>
                  <div className="flex justify-between items-center border-b-1 border-gray-300 p-1 w-full">
                    <div className="h-2 w-15 rounded-2xl bg-gray-300 mb-1"></div>
                    <div className="h-2 w-3 bg-yellow-400 rounded-lg"></div>
                  </div>
                  <div className="flex justify-between items-center border-b-1 border-gray-300 p-1 w-full">
                    <div className="h-2 w-15 rounded-2xl bg-gray-300 mb-1"></div>
                    <div className="h-2 w-3 bg-sky-400 rounded-lg"></div>
                  </div>
                  <div className="flex justify-between items-center border-b-1 border-gray-300 p-1 w-full">
                    <div className="h-2 w-15 rounded-2xl bg-gray-300 mb-1"></div>
                    <div className="h-2 w-3 bg-green-400 rounded-lg"></div>
                  </div>
                  <div className="flex justify-between items-center border-b-1 border-gray-300 p-1 w-full">
                    <div className="h-2 w-15 rounded-2xl bg-gray-300 mb-1"></div>
                    <div className="h-2 w-3 bg-sky-400 rounded-lg"></div>
                  </div>
                </div>
              </div>
              <div className="col-span-4 bg-white border-1 dark:border-black h-full rounded-lg p-3">
                <div className="flex justify-between items-center mb-5 w-full">
                  <div className="w-7 h-6 bg-gray-300 rounded-full mr-1"></div>
                  <div className="w-full">
                    <div className="h-2 max-w-15 rounded-2xl bg-gray-300 mb-1"></div>
                    <div className="h-2 max-w-5 rounded-2xl bg-gray-300 mb-1"></div>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="h-4 max-w-15 rounded-2xl bg-gray-300 mb-1"></div>
                  <div className="h-2 max-w-15 rounded-2xl bg-gray-300 mb-1"></div>
                  <div className="h-2 max-w-23 rounded-2xl bg-gray-300 mb-1"></div>
                  <div className="h-2 max-w-10 rounded-2xl bg-gray-300 mb-1"></div>
                  <div className="h-2 max-w-5 rounded-2xl bg-gray-300"></div>
                </div>
                <div className="">
                  <div className="h-2 max-w-23 rounded-2xl bg-gray-300 mb-1"></div>
                  <div className="h-2 max-w-10 rounded-2xl bg-gray-300 mb-1"></div>
                  <div className="h-2 max-w-5 rounded-2xl bg-gray-300"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center font-bold -mt-20 text-white mamad sara ease-in-out max-lg:mt-10 max-md:mt-0">
            <h1 className=" text-4xl mb-3 max-sm:text-3xl">
              A New Way to Learn
            </h1>
            <p className="text-lg text-white/60 max-sm:text-sm mamad sara ease-in-out">
              Learnly is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="flex justify-center items-center gap-30 max-md:flex-col max-md:gap-10"
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          viewport={{ once: true }}
        >
          <div className="text-center font-bold -mt-20 text-white mamad sara ease-in-out max-md:mt-0">
            <h2 className=" text-3xl mb-3 mt-20 max-sm:text-2xl">
              Become Your Best
            </h2>
            <p className="text-lg text-white/60 max-sm:text-sm mamad sara ease-in-out">
              Our curated coding courses are designed to help you master the
              skills, build real projects, and become a confident programmer —
              step by step, at your own pace. Start your journey toward becoming
              one of the best in the field.
            </p>
          </div>
          <div className="relative w-120 -skew-x-6 max-sm:w-80">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden scale-60 bg-gray-300 rounded-4xl shadow-xl z-0 animate-float translate-x-[-130px] max-md:hidden">
              <div className="bg-yellow-400 w-full h-[65%] p-5">
                <div className="animate-pulse">
                  <div className="flex just-statr items-center gap-3 mb-4">
                    <div className="h-4 w-25 rounded-2xl bg-gray-300"></div>
                    <div className="h-4 w-10 rounded-2xl bg-gray-300"></div>
                  </div>
                  <div className="mb-5">
                    <div className="h-10 w-25 rounded-2xl bg-gray-300 mb-2"></div>
                    <div className="h-7 w-19 rounded-2xl bg-gray-300"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white w-full h-[35%] p-5 dark:bg-dark relative mamad sara ease-in-out">
                <div className="animate-pulse">
                  <div className="flex just-statr items-center gap-3 mb-4">
                    <div className="h-4 w-25 rounded-2xl bg-gray-300"></div>
                  </div>
                  <div className="mb-5">
                    <div className="h-10 w-25 rounded-2xl bg-gray-300 mb-2"></div>
                  </div>
                </div>
                <div className="absolute -top-9 right-5 shadow-2xl rounded-full size-18 bg-white dark:bg-primary-dark flex justify-center items-center">
                  <div className="animate-pulse">
                    <CiPlay1 className="text-3xl text-dark dark:text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden scale-80 bg-gray-300 rounded-4xl shadow-xl z-10 animate-float translate-x-[-70px] max-md:hidden">
              <div className="bg-red-400 w-full h-[65%] p-5">
                <div className="animate-pulse">
                  <div className="flex just-statr items-center gap-3 mb-4">
                    <div className="h-4 w-25 rounded-2xl bg-gray-300"></div>
                    <div className="h-4 w-10 rounded-2xl bg-gray-300"></div>
                  </div>
                  <div className="mb-5">
                    <div className="h-10 w-25 rounded-2xl bg-gray-300 mb-2"></div>
                    <div className="h-7 w-19 rounded-2xl bg-gray-300"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white w-full h-[35%] p-5 dark:bg-dark relative mamad sara ease-in-out">
                <div className="animate-pulse">
                  <div className="flex just-statr items-center gap-3 mb-4">
                    <div className="h-4 w-25 rounded-2xl bg-gray-300"></div>
                  </div>
                  <div className="mb-5">
                    <div className="h-10 w-25 rounded-2xl bg-gray-300 mb-2"></div>
                  </div>
                </div>
                <div className="absolute -top-9 right-5 shadow-2xl rounded-full size-18 bg-white dark:bg-primary-dark flex justify-center items-center">
                  <div className="animate-pulse">
                    <CiPlay1 className="text-3xl text-dark dark:text-white" />
                  </div>
                </div>
              </div>
            </div>
            <div className="relative w-full h-full bg-dark rounded-4xl shadow-xl overflow-hidden animate-float z-20">
              <div className="bg-sky-500 w-full h-[65%] p-5">
                <div className="animate-pulse">
                  <div className="flex just-statr items-center gap-3 mb-4">
                    <div className="h-4 w-25 rounded-2xl bg-gray-300"></div>
                    <div className="h-4 w-10 rounded-2xl bg-gray-300"></div>
                  </div>
                  <div className="mb-5">
                    <div className="h-10 w-25 rounded-2xl bg-gray-300 mb-2"></div>
                    <div className="h-7 w-19 rounded-2xl bg-gray-300"></div>
                  </div>
                </div>
              </div>
              <div className="bg-white w-full h-[35%] p-5 dark:bg-dark relative mamad sara ease-in-out">
                <div className="animate-pulse">
                  <div className="flex just-statr items-center gap-3 mb-4">
                    <div className="h-4 w-25 rounded-2xl bg-gray-300"></div>
                  </div>
                  <div className="mb-5">
                    <div className="h-10 w-25 rounded-2xl bg-gray-300 mb-2"></div>
                  </div>
                </div>
                <div className="absolute -top-9 right-5 shadow-2xl rounded-full size-18 bg-white dark:bg-primary-dark flex justify-center items-center mamad sara ease-in-out">
                  <div className="animate-pulse">
                    <CiPlay1 className="text-3xl text-dark dark:text-white mamad sara ease-in-out" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Header;
