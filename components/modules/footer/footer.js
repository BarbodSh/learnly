import React from "react";
import { GrInstagram } from "react-icons/gr";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiTelegram2Fill } from "react-icons/ri";
import categoryModel from "@/models/category";
import Link from "next/link";
async function Footer() {
  const resCategory = await categoryModel.find({});
  const categories = JSON.parse(JSON.stringify(resCategory));
  return (
    <div className="dark:bg-sky-700 bg-sky-500 p-3 dark:text-white">
      <div className="container">
        <div className="flex justify-between items-center max-sm:flex-col max-sm:items-start">
          <div className="flex justify-start items-center gap-3 max-sm:flex-col max-sm:items-start">
            <Link href="/" className="text-3xl font-bold">
              Learnly
            </Link>
            <div className="flex justify-start items-center gap-2">
              {categories?.map((category) => (
                <Link
                  href={`/courses/${category._id}`}
                  className="text-lg cursor-pointer dark:hover:text-dark hover:text-white"
                  key={category._id}
                >
                  {category.title}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex justify-start items-center gap-5 text-3xl">
            <GrInstagram className="text-2xl" />
            <MdOutlineMailOutline />
            <RiTelegram2Fill />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
