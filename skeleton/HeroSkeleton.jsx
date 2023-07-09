import React from "react";
import loading from "../assets/loading.png";

export default function Hero() {
  return (
    <div className=" relative bg-gradient-to-b from-gray-900 to-gray-950 w-full min-h-[300px] rounded-md overflow-hidden flex items-center  text-white gap-5 justify-between flex-col md:flex-row md:bg-gradient-to-r border-2 border-gray-900">
      <img
        className="rounded-md absolute opacity-50 w-full md:w-auto object-contain overflow-hidden"
        src={loading}
        alt="Loading"
      />
      <div className="bg-gradient-to-b md:bg-gradient-to-r  from-transparent  md:via-gray-900 to-gray-950 w-full absolute h-full "></div>
      <div className=" z-10 m-10">
        <h1 className="text-4xl font-bold mb-5">Uchiha Madara</h1>
        <span>The GOAT</span>
      </div>
      <h1 className=" z-10 m-10 w-2/3 text-ellipsis text-xl hidden sm:block">
        Nothing ever goes as planned in this accursed world. The longer you
        live, the more you realize that the only things that truly exist in this
        reality are merely pain. suffering and futility. Listen, everywhere you
        look in this world, wherever there is light, there will always be
        shadows to be found as well.
      </h1>
    </div>
  );
}
