"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function CourseFilter() {
  const [filter, setFilter] = useState({
    title: "",
    priceFrom: 0,
    priceTo: 10000,
  });

  const searchParams = useSearchParams();
  const inputChangeHandler = (event, key) => {
    setFilter((prev) => ({ ...prev, [key]: event.target.value }));
  };

  useEffect(() => {
    const title = searchParams.get("title");
    const priceFrom = searchParams.get("priceFrom");
    const priceTo = searchParams.get("priceTo");
    setFilter((prev) => ({
      ...prev,
      ...(title ? { title } : {}),
      ...(priceFrom ? { priceFrom: Number(priceFrom) } : {}),
      ...(priceTo ? { priceTo: Number(priceTo) } : {}),
    }));
  }, []);

  const sendFilterToSearchParams = (event) => {
    event.preventDefault();
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("title", filter.title);
    searchParams.set("priceFrom", filter.priceFrom);
    searchParams.set("priceTo", filter.priceTo);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <div className="sticky p-5 top-25 h-fit col-span-4 bg-white dark:bg-dark rounded-lg mamad sara ease-in-out max-md:col-span-12 max-md:relative max-md:top-0">
      <form className="flex flex-col dark:text-white justify-center items-start gap-3 max-lg:text-xl max-lg:gap-1">
        <div className="w-full">
          <label htmlFor="searchInput" className="text-xl mb-2 block">
            Title :
          </label>
          <input
            id="searchInput"
            type="text"
            className="border-1 border-sky-500 p-2 ring-0 rounded-lg w-full outline-none dark:bg-dark bg-white"
            placeholder="search title ..."
            value={filter.title || ""}
            onChange={(event) => inputChangeHandler(event, "title")}
          />
        </div>
        <div className="w-full">
          <label htmlFor="priceFromInput" className="text-xl mb-2 block">
            From :{" "}
            <span className="text-sky-600 font-semibold">
              {filter.priceFrom || 0} $
            </span>
          </label>
          <input
            id="priceFromInput"
            type="range"
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            min={0}
            max={10000}
            value={filter.priceFrom || 0}
            onChange={(event) => inputChangeHandler(event, "priceFrom")}
          />
        </div>
        <div className="w-full">
          <label htmlFor="priceToInput" className="text-xl mb-2 block">
            To :{" "}
            <span className="text-sky-600 font-semibold">
              {filter.priceTo || 10000} $
            </span>
          </label>
          <input
            id="priceToInput"
            type="range"
            className="border-1 border-sky-500 p-2 ring-0 rounded-2xl w-full outline-none dark:bg-dark bg-white"
            min={0}
            max={10000}
            value={filter.priceTo || 10000}
            onChange={(event) => inputChangeHandler(event, "priceTo")}
          />
        </div>
        <button
          type="submit"
          onClick={sendFilterToSearchParams}
          className="border-1 mt-5 cursor-pointer hover:bg-sky-500 transition duration-200 ease-in border-sky-500 p-2 ring-0 rounded-lg w-full outline-none dark:bg-dark bg-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CourseFilter;
