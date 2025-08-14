import React from "react";
import TableForCategory from "@/templates/p-admin/category/tableForCategory";
import CategoryForm from "@/templates/p-admin/category/categoryForm";
import { getCatgory } from "@/backend/utils/category";

async function page() {
  const categories = await getCatgory();
  return (
    <div className="p-5">
      <div className="dark:bg-dark dark:text-white bg-white border-1 border-dark/20 dark:border-white/20 p-5 flex justify-center content-center gap-2 flex-wrap">
        <CategoryForm />
        <TableForCategory categories={categories} />
      </div>
    </div>
  );
}

export default page;
