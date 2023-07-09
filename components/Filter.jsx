import React, { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function Filter({ from, title, filterData }) {
  const [params, setParams] = useSearchParams();
  const [show, setShow] = useState(false);
  function searchParams(key, value) {
    const sp = new URLSearchParams(params);
    sp.delete("page");
    if (value === null) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  }
  const filters = filterData.map((e, i) => {
    return (
      <Link
        key={i}
        onClick={() => setShow(false)}
        to={"/" + from + searchParams(title, e.mal_id)}
        className="m-1 p-3 rounded-md hover:bg-gray-700 transition-all ease-in-out duration-300"
      >
        {e.name}
      </Link>
    );
  });
  if (params.has(title)) {
    filters.unshift(
      <Link
        key={filters.length + 1}
        onClick={() => setShow(false)}
        to={"/" + from + searchParams(title, null)}
        className="m-1 p-3 rounded-md hover:bg-gray-700 transition-all ease-in-out duration-300"
      >
        Clear
      </Link>
    );
  }
  return (
    <div className="w-full">
      <button
        className=" relative group bg-transparent w-full border-b-2 border-gray-900  focus:border-gray-700 transition-all ease-in-out duration-300"
        onClick={() => setShow((prev) => !prev)}
      >
        <div className="flex justify-between px-5 py-3  items-center">
          {params.has(title)
            ? filterData.filter((e) => e.mal_id == params.get(title))[0]?.name
            : title}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
            />
          </svg>
        </div>
      </button>

      <div className=" relative w-full">
        <div
          className={
            " border-2 bg-gray-900 max-h-[300px] no-scrollbar overflow-scroll border-gray-900 rounded-md flex-col items-stretch w-full text-center absolute z-50 top-2 " +
            (show ? "flex" : "hidden")
          }
        >
          {filters}
        </div>
      </div>
    </div>
  );
}
