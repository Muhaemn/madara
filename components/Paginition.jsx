import React from "react";
import { Link, useSearchParams } from "react-router-dom";

export default function pagination({ curentPage, lastPage }) {
  const pages = [];
  const [params] = useSearchParams();
  function searchParams(key, value) {
    const sp = new URLSearchParams(params);
    if (value === null) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  }
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  pages.push(
    <Link
      onClick={scrollTop}
      className={
        "px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base bg-gray-900 " +
        (curentPage == 1 ? "cursor-not-allowed text-gray-500" : "")
      }
      key={lastPage + 1}
      to={searchParams("page", curentPage == 1 ? curentPage : curentPage - 1)}
    >
      {"<"}
    </Link>
  );
  if (lastPage <= 5) {
    for (let i = 1; i <= lastPage; i++) {
      pages.push(
        <Link
          onClick={scrollTop}
          className={
            "px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base  " +
            (curentPage == i ? "bg-gray-700" : "bg-gray-900")
          }
          key={i}
          to={searchParams("page", i)}
        >
          {i}
        </Link>
      );
    }
  } else {
    if (curentPage < 4) {
      for (let i = 1; i <= 4; i++) {
        pages.push(
          <Link
            onClick={scrollTop}
            className={
              "px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base  " +
              (curentPage == i ? "bg-gray-700" : "bg-gray-900")
            }
            key={i}
            to={searchParams("page", i)}
          >
            {i}
          </Link>
        );
      }
      pages.push(<span key={lastPage + 4}>..</span>);
      pages.push(
        <Link
          onClick={scrollTop}
          className="px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base bg-gray-900"
          key={lastPage}
          to={searchParams("page", lastPage)}
        >
          {lastPage}
        </Link>
      );
    } else if (curentPage >= 4 && curentPage < lastPage - 2) {
      pages.push(
        <Link
          onClick={scrollTop}
          className="px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base bg-gray-900"
          key={1}
          to={searchParams("page", 1)}
        >
          {1}
        </Link>
      );
      pages.push(<span key={lastPage + 3}>..</span>);
      for (let i = curentPage - 1; i <= curentPage + 1; i++) {
        pages.push(
          <Link
            onClick={scrollTop}
            className={
              "px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base  " +
              (curentPage == i ? "bg-gray-700" : "bg-gray-900")
            }
            key={i}
            to={searchParams("page", i)}
          >
            {i}
          </Link>
        );
      }
      pages.push(<span key={lastPage + 4}>..</span>);
      pages.push(
        <Link
          onClick={scrollTop}
          className="px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base bg-gray-900"
          key={lastPage}
          to={searchParams("page", lastPage)}
        >
          {lastPage}
        </Link>
      );
    } else {
      pages.push(
        <Link
          onClick={scrollTop}
          className="px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base bg-gray-900"
          key={1}
          to={searchParams("page", 1)}
        >
          {1}
        </Link>
      );
      pages.push(<span key={lastPage + 5}>..</span>);
      for (let i = lastPage - 2; i <= lastPage; i++) {
        pages.push(
          <Link
            onClick={scrollTop}
            className={
              "px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base  " +
              (curentPage == i ? "bg-gray-700" : "bg-gray-900")
            }
            key={i}
            to={searchParams("page", i)}
          >
            {i}
          </Link>
        );
      }
    }
  }
  pages.push(
    <Link
      onClick={scrollTop}
      className={
        "px-2.5 py-2 hover:bg-gray-700 transition-all ease-in-out duration-150 md:px-4 md:py-3 rounded-md text-sm sm:text-base bg-gray-900 " +
        (curentPage == lastPage ? "cursor-not-allowed text-gray-500" : "")
      }
      key={lastPage + 2}
      to={searchParams(
        "page",
        curentPage == lastPage ? curentPage : curentPage + 1
      )}
    >
      {">"}
    </Link>
  );
  return <>{pages}</>;
}
