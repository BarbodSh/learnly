"use client";
import React, { useEffect, useState } from "react";
import { SlLogout } from "react-icons/sl";
import RemoveModal from "@/modules/removeModal/removeModal";
import { useRouter } from "next/navigation";
import LinkForSidebar from "@/components/modules/Link/LinkForSidebar";
function AdminSidebar({ username }) {
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [sidebar, setSidebar] = useState("");
  const router = useRouter();
  useEffect(() => {
    const path = window.location.pathname;
    setSidebar(path);
  }, []);
  const logOut = async () => {
    const res = await fetch("/api/auth/signout", {
      method: "POST",
    });
    if (res.status === 200) {
      router.replace("/login");
    }
  };
  return (
    <>
      <div className="bg-white dark:bg-dark mt-20 dark:text-white p-5 flex flex-col justify-center items-start gap-3 border-1 border-dark/20 dark:border-white/20 sticky top-5">
        <div className="border-b-3 dark:border-white p-2 font-bold text-2xl border-dark flex justify-between items-center w-full">
          <div className="flex justify-start items-center gap-3">
            <div className="size-13 rounded-full dark:bg-white bg-dark"></div>
            <div>{username}</div>
          </div>
          <div className="flex justify-start items-center gap-3">
            <SlLogout
              className="hover:text-red-500 cursor-pointer"
              onClick={() => {
                setOpenRemoveModal(true);
              }}
            />
          </div>
        </div>
        <div className="mt-5 opacity-60">option</div>
        <div className="flex flex-col justify-center items-start gap-3 text-xl font-bold w-full">
          <LinkForSidebar
            name={"Home"}
            link={"/p-admin"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"User"}
            link={"/p-admin/user"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"Notification"}
            link={"/p-admin/notification"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"Category"}
            link={"/p-admin/category"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"Course"}
            link={"/p-admin/course"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"Lesson"}
            link={"/p-admin/lesson"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"Comment"}
            link={"/p-admin/comment"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"Ticket"}
            link={"/p-admin/ticket"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"Discunt"}
            link={"/p-admin/discunt"}
            active={sidebar}
            onClick={setSidebar}
          />
          <LinkForSidebar
            name={"order"}
            link={"/p-admin/order"}
            active={sidebar}
            onClick={setSidebar}
          />
        </div>
      </div>
      <RemoveModal
        remove={logOut}
        openRemoveModal={openRemoveModal}
        setOpenRemoveModal={setOpenRemoveModal}
        title={"Are you sure about logout?"}
      />
    </>
  );
}

export default AdminSidebar;
