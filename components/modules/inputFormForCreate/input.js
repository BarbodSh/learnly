"use client";
import React from "react";

function InputFormCreate({
  name,
  placeholder,
  value,
  setValue,
  type = "text",
}) {
  return (
    <div className="col-span-6 flex flex-col justify-center items-start gap-2 w-full">
      <label htmlFor="">{name} :</label>
      <input
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type={type}
        className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
      />
    </div>
  );
}

export default InputFormCreate;
