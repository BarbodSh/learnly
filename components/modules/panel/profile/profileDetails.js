"use client";
import React, { useEffect, useState } from "react";
import Input from "@/modules/inputInForm/input";
import { useRouter } from "next/navigation";
import { showErrorSwal, showSuccessSwal } from "@/lib/frontend/utils/helper";
import { allStatus } from "@/lib/frontend/utils/status";
import { updateInformationUser } from "@/lib/frontend/utils/user";
import { validateSignUp } from "@/lib/validator/user";

function ProfileDetails({ name, username, email, _id }) {
  const [fullName, setFullName] = useState(name);
  const [user, setUser] = useState(username);
  const [gmail, setGmail] = useState(email);
  const [password, setPassword] = useState("");
  const router = useRouter();

  const updateProfile = async (event) => {
    event.preventDefault();
    const newInformation = {
      username: user,
      name: fullName,
      email: gmail,
      password,
    };

    const validate = validateSignUp(newInformation);
    if (validate !== true) {
      return showErrorSwal(validate);
    }

    const res = await updateInformationUser(_id, newInformation);
    if (res.status === 200) {
      showSuccessSwal(`${user} update was successfully`, async () => {
        await fetch("/api/auth/signout", {
          method: "POST",
        });
        router.replace("/login");
      });
      return;
    }

    const reStatus = allStatus(res);
    return reStatus;
  };

  return (
    <div className="w-full">
      <form
        onSubmit={updateProfile}
        action=""
        className="grid grid-cols-12 justify-between items-center gap-3 w-full"
      >
        <div className="col-span-6">
          <Input value={fullName} setValue={setFullName} name={"name"} />
        </div>
        <div className="col-span-6">
          <Input value={user} setValue={setUser} name={"username"} />
        </div>
        <div className="col-span-6">
          <Input value={gmail} setValue={setGmail} name={"email"} />
        </div>
        <div className="col-span-6">
          <Input value={password} setValue={setPassword} name={"password"} />
        </div>
        <button className="col-span-5 border-1 border-sky-500 hover:bg-sky-500 transition duration-200 ease-in p-2 rounded-2xl cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ProfileDetails;
