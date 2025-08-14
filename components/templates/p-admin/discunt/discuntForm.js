"use client";
import InputFormCreate from "@/modules/inputFormForCreate/input";
import { createDiscunt } from "@/frontend/utils/discunt";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { allStatus } from "@/frontend/utils/status";
import { validateDiscunt } from "@/validator/discunt";

function DiscuntForm() {
  const [name, setName] = useState("");
  const [percent, setPercent] = useState(0);
  const [maxUse, setMaxUse] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const createDiscuntHandler = async (event) => {
    event.preventDefault();
    const newDiscunt = {
      code: name,
      percent,
      maxUse,
    };
    const validate = validateDiscunt(newDiscunt);
    if (validate !== true) {
      return showErrorSwal(validate);
    }
    setIsLoading(true);
    const res = await createDiscunt(newDiscunt);
    setIsLoading(false);
    if (res.status === 201) {
      showSuccessSwal("discunt code create successfully");
      return router.refresh();
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  return (
    <div className="w-full mb-5">
      <form
        onSubmit={createDiscuntHandler}
        action=""
        className="grid grid-cols-12 justify-between content-center gap-5 w-full"
      >
        <InputFormCreate
          name={"Name"}
          value={name}
          setValue={setName}
          placeholder={"write name ..."}
        />
        <InputFormCreate
          name={"Percen"}
          value={percent}
          setValue={setPercent}
          placeholder={"0%"}
        />
        <InputFormCreate
          name={"Max Use"}
          value={maxUse}
          setValue={setMaxUse}
          placeholder={"0"}
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

export default DiscuntForm;
