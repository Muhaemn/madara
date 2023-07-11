import React from "react";
import { Link } from "react-router-dom";
export default function Example() {
  return (
    <>
      <main className="bg-gray-950 flex justify-center items-center h-[80vh] ">
        <div className="text-center">
          <p className=" text-8xl font-semibold text-white">404</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to=""
              className="rounded-md bg-gray-700 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 transition-all ease-in-out duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
