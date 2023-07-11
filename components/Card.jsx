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
    <div className=" relative overflow-hidden rounded-md w-full h-[500px] sm:w-[250px] sm:h-[380px] bg-transparent text-white bg-gray-200  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border-2 border-gray-900">
      <Link to={"" + id + ""}>
        <div className=" overflow-hidden h-[85%] sm:h-[300px]">
          <img
            className=" hover:scale-110 transition-all ease-in-out duration-300 h-full w-full object-cover"
            src={img}
            alt={title}
          />
        </div>
        <div>
          <h3 className="pt-2 px-2 text-xl font-bold text-center md:text-base whitespace-nowrap">
            {title}
          </h3>
          <div className="flex justify-between my-3 mb-2 sm:mb-0">
            <h3 className="px-2 text-base ">{type}</h3>
            <h3 className="px-2 text-base ">
              {Math.round(score) > 0 ? Math.round(score) : "_ "}/10
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
}
