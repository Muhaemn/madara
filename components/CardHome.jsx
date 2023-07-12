import React from "react";

export default function Card({ img, title, score, type }) {
  title =
    title && title.length > 15
      ? title.substring(0, 15) + "..."
      : !title
      ? "N/A"
      : title;
  return (
    <div className=" relative overflow-hidden rounded-md w-[200px] h-[315px] md:w-[220px] md:h-[380px]  text-gray-400 bg-gradient-to-t from-gray-900 via-gray-950 to-gray-950  border-2 border-gray-900">
      <div className=" overflow-hidden h-[250px] md:h-[310px]">
        <img
          className=" hover:scale-110 transition-all ease-in-out duration-100 h-full w-full object-cover"
          src={img}
          alt={title}
        />
      </div>
      <div>
        <h3 className="pt-2 px-3  font-bold text-base md:text-base whitespace-nowrap">
          {title}
        </h3>
        <div className="flex justify-between mt-2">
          <h3 className="px-3 text-xs sm:test-sm  font-bold ">{type}</h3>
          <h3 className="px-3 text-xs sm:test-sm  font-bold ">
            {score ? Math.round(score * 10) / 10 + "/10" : ""}
          </h3>
        </div>
      </div>
    </div>
  );
}
