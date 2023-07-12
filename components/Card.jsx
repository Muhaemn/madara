import React from "react";
import { Link } from "react-router-dom";

export default function Card({ img, title, score, type, id }) {
  title =
    title && title.length > 23
      ? title.substring(0, 23) + "..."
      : !title
      ? "N/A"
      : title;
  return (
    <div className=" relative overflow-hidden rounded-md w-full h-[500px] sm:w-[250px] sm:h-[380px] text-white bg-gradient-to-t from-gray-900 via-gray-950 to-gray-950 border-2 border-gray-900">
      <Link to={"" + id + ""}>
        <div className=" overflow-hidden h-[85%] sm:h-[300px]">
          <img
            className=" hover:scale-110 transition-all ease-in-out duration-300 h-full w-full object-cover"
            src={img}
            alt={title}
          />
        </div>
        <div>
          <h3 className="pt-2 px-3 text-xl font-bold text-center sm:text-base whitespace-nowrap">
            {title}
          </h3>
          <div className="flex justify-between mt-3 md:mt-4 sm:mb-0">
            <h3 className="px-3 text-base md:text-sm font-bold">{type}</h3>
            <h3 className="px-3 text-base md:text-sm font-bold ">
              {score ? Math.round(score * 10) / 10 + "/10" : ""}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
