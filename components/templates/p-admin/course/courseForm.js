"use client";
import InputFormCreate from "@/modules/inputFormForCreate/input";
import { createCourse } from "@/frontend/utils/course";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { validateCourse } from "@/validator/course";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { allStatus } from "@/frontend/utils/status";

function CourseForm({ categories, teachers }) {
  const [title, setTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [isFree, setISFree] = useState(false);
  const [support, setSupport] = useState("");
  const [category, setCategory] = useState(0);
  const [teacher, setTeacher] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createCourseHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("coverImage", coverImage);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("isFree", isFree);
    formData.append("support", support);
    formData.append("category", category);
    formData.append("teacher", teacher);

    const validate = validateCourse({
      title,
      description,
      coverImage,
      price,
      isFree,
      support,
      category,
      teacher,
    });

    if (validate !== true) {
      return showErrorSwal(validate);
    }
    setIsLoading(true);
    const res = await createCourse(formData);
    setIsLoading(false);
    if (res.status === 201) {
      showSuccessSwal("category create successfully");
      router.refresh();
      setTitle("");
      setDescription("");
      setCoverImage(null);
      setPrice(0);
      setISFree(false);
      setSupport("");
      setCategory(0);
      return setTeacher(0);
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <div className="w-full mb-5">
      <form
        onSubmit={createCourseHandler}
        action=""
        className="grid grid-cols-12 justify-between content-center gap-5 w-full"
      >
        <InputFormCreate
          name={"Title"}
          placeholder={"write title ..."}
          value={title}
          setValue={setTitle}
          type={"text"}
        />
        <div className="col-span-6 flex flex-col justify-center items-start gap-2 w-full">
          <label htmlFor="">Cover :</label>
          <input
            placeholder="select cover ..."
            onChange={(event) => setCoverImage(event.target.files[0])}
            type="file"
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
          />
        </div>
        <InputFormCreate
          name={"Price"}
          placeholder={"write price ..."}
          value={price}
          setValue={setPrice}
          type={"number"}
        />
        <InputFormCreate
          name={"Support"}
          placeholder={"phone , email, chat"}
          value={support}
          setValue={setSupport}
          type={"text"}
        />
        <div className="col-span-12 flex flex-col justify-start items-start w-full gap-5">
          <label htmlFor="">Description :</label>
          <textarea
            value={description}
            rows={10}
            onChange={(event) => setDescription(event.target.value)}
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white resize-none"
          />
        </div>
        <div className="col-span-6 flex flex-col justify-center items-start gap-2 w-full">
          <label htmlFor="">Categories :</label>
          <select
            name=""
            id=""
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="0">select category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-6 flex flex-col justify-center items-start gap-2 w-full">
          <label htmlFor="">Teachers :</label>
          <select
            name=""
            id=""
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            value={teacher}
            onChange={(event) => setTeacher(event.target.value)}
          >
            <option value="0">select teacher</option>
            {teachers.map((teacher) => (
              <option key={teacher._id} value={teacher._id}>
                {teacher.username}
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
          <button
            className={`w-[40%] border-1 border-sky-500 hover:bg-sky-500 transition duration-200 ease-in p-2 rounded-2xl cursor-pointer ${
              isLoading ? "bg-sky-500" : ""
            }`}
          >
            {isLoading ? "sending" : "send"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CourseForm;
