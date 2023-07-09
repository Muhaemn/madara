import React from "react";

export default function Hero({ img, title, synopsis, genre }) {
  return (
    <div className=" relative bg-gradient-to-b from-gray-900 to-gray-950 w-full min-h-[300px] rounded-md overflow-hidden flex items-center  text-white gap-5 justify-between flex-col md:flex-row md:bg-gradient-to-r border-2 border-gray-900">
      <img
        className="rounded-md absolute opacity-50 w-full md:w-auto object-contain overflow-hidden"
        src={img}
        alt={title}
      />
      <div className="bg-gradient-to-b md:bg-gradient-to-r  from-transparent  md:via-gray-900 to-gray-950 w-full absolute h-full "></div>
      <div className=" z-10 m-10">
        <h1 className="text-4xl font-bold mb-5">{title}</h1>
        <span>{genre()}</span>
      </div>
      <h1 className=" z-10 m-10 w-2/3 text-ellipsis text-xl hidden sm:block">
        {synopsis}
      </h1>
    </div>
  );
}
