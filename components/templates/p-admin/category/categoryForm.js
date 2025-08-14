"use client";

import InputFormCreate from "@/components/modules/inputFormForCreate/input";
import { createCategory } from "@/frontend/utils/category";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { allStatus } from "@/lib/frontend/utils/status";
import { categoryTitleValidation } from "@/validator/category";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CategoryForm() {
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createCategoryHandler = async (event) => {
    event.preventDefault();
    const titleValidate = categoryTitleValidation(title);
    if (titleValidate !== true) {
      return showErrorSwal(titleValidate);
    }
    setIsLoading(true);
    const res = await createCategory(title);
    setIsLoading(false);

    if (res.status === 201) {
      showSuccessSwal("category create successfully");
      router.refresh();
      return setTitle("");
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <div className="w-full mb-5">
      <form
        onSubmit={createCategoryHandler}
        action=""
        className="grid grid-cols-12 justify-between content-center gap-5 w-full"
      >
        <InputFormCreate
          name={"Title"}
          value={title}
          setValue={setTitle}
          placeholder={"write title ..."}
        />
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

export default CategoryForm;
