import React from "react";
import { Link } from "react-router-dom";
export default function Example() {
  return (
    <>
      <main className="bg-gray-950 flex justify-center items-center h-[80vh]">
        <div className="text-center">
          <p className=" text-3xl font-bold text-white">
            Something wrong happened
          </p>
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-white">
            pleace try again
          </h1>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to={-1}
              className="rounded-md bg-gray-700 px-10 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 transition-all ease-in-out duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
