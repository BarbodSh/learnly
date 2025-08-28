"use client";
import InputForCreate from "@/modules/inputFormForCreate/input";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { createNotification } from "@/frontend/utils/notification";
import { allStatus } from "@/frontend/utils/status";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { validateNotification } from "@/lib/validator/notification";

function NotificationForm({ users }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState(0);

  const router = useRouter();
  const createLessonHandler = async (event) => {
    event.preventDefault();
    const validate = validateNotification({ title, userId, description });
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    const res = await createNotification(title, description, userId);

    if (res.status === 201) {
      showSuccessSwal("category notification successfully");
      router.refresh();
      setTitle("");
      setDescription("");
      return setUserId(0);
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
            value={userId}
            onChange={(event) => setUserId(event.target.value)}
          >
            <option value="0">select category</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>
        <div className="col-span-12 flex flex-col justify-start items-start w-full gap-5">
          <label htmlFor="">Description :</label>
          <textarea
            value={description}
            rows={10}
            onChange={(event) => setDescription(event.target.value)}
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white resize-none"
          />
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

export default NotificationForm;
