"use client";
import React, { useState } from "react";
import Input from "../../inputInForm/input";
import { useRouter } from "next/navigation";
import { createTicket } from "@/lib/frontend/utils/ticket";
import { validateTicket } from "@/lib/validator/ticket";
import { showErrorSwal } from "@/lib/frontend/utils/helper";
import { allStatus } from "@/lib/frontend/utils/status";
import InputFormCreate from "../../inputFormForCreate/input";

function TicketForm({ user }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const sendTicket = async (event) => {
    event.preventDefault();
    const newTicket = {
      title,
      user,
      description,
      priority,
    };

    const validate = validateTicket(newTicket);
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    setIsLoading(true);
    const res = await createTicket(newTicket);
    setIsLoading(false);

    if (res.status === 201) {
      router.push("/panel/ticket");
      return clearInput();
    }

    const resStatus = allStatus(res);
    return resStatus;
  };

  const clearInput = () => {
    setTitle("");
    setDescription("");
  };
  return (
    <div className="w-full">
      <form
        onSubmit={sendTicket}
        action=""
        className="grid grid-cols-12 justify-between items-center gap-3 w-full"
      >
        <InputFormCreate
          name={"Title"}
          value={title}
          setValue={setTitle}
          placeholder={"write title ..."}
        />
        <div className="col-span-6 flex flex-col justify-center items-start">
          <label htmlFor="" className="mb-2 block">
            Priority :
          </label>
          <select
            name=""
            id=""
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option value="1">low</option>
            <option value="2">medium</option>
            <option value="3">high</option>
          </select>
        </div>
        <div className="col-span-12">
          <label htmlFor="" className="mb-2 block">
            Desctiption :
          </label>
          <textarea
            placeholder="write description ..."
            rows={5}
            className="w-full resize-none border-1 border-sky-500 rounded-2xl outline-none p-5"
            name=""
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          ></textarea>
        </div>
        <button className="col-span-5 border-1 border-sky-500 hover:bg-sky-500 transition duration-200 ease-in p-2 rounded-2xl cursor-pointer">
          {isLoading ? "Submitting" : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
