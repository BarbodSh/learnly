import React from "react";
import Register from "@/templates/rgeisterPage/register";
import Link from "next/link";
import Image from "next/image";
function page() {
  return (
    <section className="login-form h-lvh bg-sky-700">
      <div className="container flex justify-center items-center h-lvh">
        <div className="relative z-10 p-20 w-full">
          <div className="relatice z-10">
            <div className="relative z-20 login-wrapper flex justify-center w-full text-white border-2 border-white rounded-2xl overflow-hidden">
              <div className="w-full text-center bg-white/10 backdrop-blur-sm p-10 max-sm:p-5">
                <h1 className="text-5xl font-bold mb-5 max-sm:text-3xl max-sm:mb-2">
                  Welcome
                </h1>
                <Register />
                <Link
                  href="/login"
                  className="block mt-3 hover:text-sky-500 transition duration-200 ease-in max-sm:mt-2 max-sm:text-sm"
                >
                  Login
                </Link>
              </div>
              <div className=" bg-white p-15 max-lg:hidden flex justify-center items-center">
                <Image
                  src="/images/lego.png"
                  alt="Login Image"
                  width={600}
                  height={600}
                />
              </div>
            </div>
            <div className="absolute size-200 rounded-full bg-primary -top-70 -left-100 max-sm:-left-130 max-sm:-top-110"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default page;
