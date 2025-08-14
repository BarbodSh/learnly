import React from "react";
import { FaRegUser } from "react-icons/fa";
function Input({ name, value, setValue }) {
  return (
    <div className="flex flex-col justify-center gap-1 items-start mb-3 w-full max-sm:mb-3">
      <label htmlFor="" className="text-lg max-sm:text-sm">
        {name} :
      </label>
      <div className="border-1 border-sky-500 p-2 rounded-2xl w-[90%] max-lg:w-full flex justify-between items-center">
        <input
          type="text"
          className="outline-none w-[90%]"
          value={value}
          onChange={(event) => {
            setValue(event.target.value);
          }}
        />
        <FaRegUser />
      </div>
    </div>
  );
}

export default Input;
