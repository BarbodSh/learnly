"use client";
import { showErrorSwal, showSuccessSwal } from "@/frontend/utils/helper";
import { LiaEyeSolid } from "react-icons/lia";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Input from "@/modules/inputInForm/input";
import { validateIdentifierUser, validatePasswordUser } from "@/validator/user";
import { login } from "@/frontend/utils/user";
import { allStatus } from "@/lib/frontend/utils/status";

function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [seePassword, setSeePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const signIn = async (event) => {
    event.preventDefault();

    const validateIdentifier = validateIdentifierUser(identifier);

    if (validateIdentifier !== true) {
      return showErrorSwal(validateIdentifierUser);
    }

    const validatePassword = validatePasswordUser(password);

    if (validatePassword !== true) {
      return showErrorSwal(validatePassword);
    }

    const user = {
      identifier,
      password,
    };

    setIsLoading(true);
    const res = await login(user);
    const data = await res.json();
    setIsLoading(false);

    if (res.status === 200) {
      showSuccessSwal(`${data.username} login was successfully`, () => {
        router.replace("/");
      });
      return clearInput();
    }
    const resStatus = allStatus(res);
    return resStatus;
  };

  const clearInput = () => {
    setIdentifier("");
    setPassword("");
  };

  return (
    <>
      <form action="" className="w-full" onSubmit={signIn}>
        <Input
          name="username or email"
          value={identifier}
          setValue={setIdentifier}
        />
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
            {isLoading ? "Logging in" : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;
