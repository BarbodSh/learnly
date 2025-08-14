"use client";
import InputForCreate from "@/components/modules/inputFormForCreate/input";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
import { createLesson } from "@/lib/frontend/utils/lesson";
import { allStatus } from "@/lib/frontend/utils/status";
import { validateLesson } from "@/lib/validator/lesson";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LessonForm({ courses }) {
  const [title, setTitle] = useState("");
  const [isFree, setISFree] = useState(false);
  const [course, setCourse] = useState(0);

  const router = useRouter();
  const createLessonHandler = async (event) => {
    event.preventDefault();

    const validate = validateLesson(title, course, isFree);
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    const res = await createLesson(title, course, isFree);

    if (res.status === 201) {
      showSuccessSwal("category create successfully");
      router.refresh();
      setTitle("");
      setISFree(false);
      return setCourse(0);
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <div className="w-full mb-5">
      <form
        onSubmit={createLessonHandler}
        action=""
        className="grid grid-cols-12 justify-between content-center gap-5 w-full"
      >
        <InputForCreate
          name={"Title"}
          placeholder={"write title ..."}
          value={title}
          setValue={setTitle}
          type={"text"}
        />
        <div className="col-span-6 flex flex-col justify-center items-start gap-2 w-full">
          <label htmlFor="">Categories :</label>
          <select
            name=""
            id=""
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            value={course}
            onChange={(event) => setCourse(event.target.value)}
          >
            <option value="0">select category</option>
            {courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-6 flex justify-start items-start w-full gap-5">
          <div className="flex justify-center items-center gap-3">
            <label htmlFor="">Free:</label>
            <input
              type="radio"
              name="fav_language"
              checked={isFree === true}
              value={true}
              onChange={() => setISFree(true)}
              className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            />
          </div>
          <div className="flex justify-center items-center gap-3">
            <label htmlFor="">paid:</label>
            <input
              type="radio"
              name="fav_language"
              checked={isFree === false}
              value={false}
              onChange={() => setISFree(false)}
              className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            />
          </div>
        </div>
        <div className="col-span-12">
          <button className="w-[40%] border-1 border-sky-500 hover:bg-sky-500 transition duration-200 ease-in p-2 rounded-2xl cursor-pointer">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default LessonForm;
