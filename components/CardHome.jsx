import React from "react";

export default function Card({ img, title, score, type }) {
  title =
    title && title.length > 15
      ? title.substring(0, 15) + "..."
      : !title
      ? "N/A"
      : title;
  return (
    <div className=" relative overflow-hidden rounded-md w-[200px] h-[315px] md:w-[220px] md:h-[380px] bg-transparent text-white bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-2 border-gray-900">
      <div className=" overflow-hidden h-[250px] md:h-[300px]">
        <img
          className=" hover:scale-110 transition-all ease-in-out duration-100 h-full w-full object-cover"
          src={img}
          alt={title}
        />
      </div>
      <div>
        <h3 className="pt-2 px-2 text-sm md:text-base whitespace-nowrap">
          {title}
        </h3>
        <div className="flex justify-between my-3 mb-2 sm:mb-0">
          <h3 className="px-2 text-sm ">{type}</h3>
          <h3 className="px-2 text-sm ">
            {Math.round(score) > 0 ? Math.round(score) : "_ "}/10
          </h3>
        </div>
      </div>
    </div>
  );
}
