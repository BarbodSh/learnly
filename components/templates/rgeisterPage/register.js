"use client";
import React, { useState } from "react";
import Input from "@/modules/inputInForm/input";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
import { useRouter } from "next/navigation";
import { allStatus } from "@/lib/frontend/utils/status";
import { reguster } from "@/lib/frontend/utils/user";
import { validateSignUp } from "@/lib/validator/user";

function Register() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signUp = async (event) => {
    event.preventDefault();

    const newUser = {
      name,
      username,
      email,
      password,
    };

    const validate = validateSignUp(newUser);
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    setIsLoading(true);
    const res = await reguster(newUser);
    const data = await res.json();
    setIsLoading(false);

    if (res.status === 201) {
      showSuccessSwal(`${data.username} register was successfully`, () => {
        router.replace("/");
      });
      clearInput();
      return;
    }

    if (res.status === 409) {
      return showErrorSwal("This Username or Email Exist already");
    }

    if (res.status === 401) {
      return showErrorSwal("user is ban");
    }
    const resStaus = allStatus(res);
    return resStaus;
  };

  const clearInput = () => {
    setName("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <>
      <form action="" className="w-full" onSubmit={signUp}>
        <Input name="name" value={name} setValue={setName} />
        <Input name="username" value={username} setValue={setUsername} />
        <Input name="email" value={email} setValue={setEmail} />
        <div className="flex flex-col justify-center gap-1 items-start mb-3 w-full max-sm:mb-3">
          <label htmlFor="" className="text-lg max-sm:text-sm">
            password :
          </label>
          <div className="border-1 border-sky-500 p-2 rounded-2xl w-[90%] max-lg:w-full flex justify-between items-center">
            <input
              type={seePassword ? "text" : "password"}
              className="outline-none w-[90%]"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            {seePassword ? (
              <LiaEyeSlashSolid
                className="text-xl"
                onClick={() => setSeePassword(false)}
              />
            ) : (
              <LiaEyeSolid
                className="text-xl"
                onClick={() => setSeePassword(true)}
              />
            )}
          </div>
        </div>
        <div>
          <button
            className={`border-1 text-lg font-bold border-sky-500 p-2 max-sm:text-sm rounded-2xl cursor-pointer w-[60%] text-center transition-all duration-200 ease-in ${
              isLoading ? "bg-sky-500" : "hover:bg-sky-500"
            }`}
          >
            {isLoading ? "Registering" : "Register"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
