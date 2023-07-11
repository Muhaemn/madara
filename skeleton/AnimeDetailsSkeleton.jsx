import React from "react";
import loading from "../assets/loading.png";

export default function AnimeDetails() {
  return (
    <>
      <div className=" relative">
        <div className="w-full h-10 bg-gradient-to-t absolute z-[-9]  from-transparent to-gray-950"></div>
        <img
          className="h-[100vh] w-full absolute -z-10 object-cover opacity-5"
          src={loading}
          alt="img"
        />
      </div>
      <div className="p-10 text-white">
        <div className="flex justify-between items-center gap-5 flex-col md:flex-row-reverse">
          <div className="border-[5px] rounded-md border-gray-900">
            <img
              className=" w-[350px] h-[500px] object-coverv"
              src={loading}
              alt="img"
            />
          </div>
          <div className="flex flex-col gap-5">
            <h1 className="font-bold text-4xl">Loading</h1>
            <h1 className="text-md tracking-wider">Type:</h1>
            <h1 className="text-md tracking-wider">Source:</h1>
            <h1 className="text-md tracking-wider">Status:</h1>
            <h1 className="text-md tracking-wider">Epsodies:</h1>
            <h1 className="text-md tracking-wider">Aired:</h1>
            <h1 className="text-md tracking-wider">Duration:</h1>
            <h1 className="text-md tracking-wider">Rating:</h1>
            <h1 className="text-md tracking-wider">Score:</h1>
            <h1 className="text-md tracking-wider">Geners:</h1>
            <a
              href=""
              className="bg-[#2D4E9D] inline-block rounded-md px-5 py-3 text-center font-bold "
            >
              Loading
            </a>
          </div>
        </div>
        <div className="w-full mt-10">
          <h1 className="font-bold text-4xl my-5">About</h1>
          <h1>Loading</h1>
        </div>
      </div>
    </>
  );
}
