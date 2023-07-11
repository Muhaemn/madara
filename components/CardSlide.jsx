import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import CardHome from "./CardHome";
import { Link } from "react-router-dom";
import CardSlideSkeleton from "../skeleton/CardSlideSkeleton";
export default function cardSlide({ data, title, to }) {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  if (!data) {
    return <CardSlideSkeleton />;
  }
  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  const cards = data.map((e, i) => {
    return (
      <li key={i}>
        <Link to={to + "/" + e.mal_id + ""}>
          <CardHome
            img={e?.images?.webp?.large_image_url}
            title={e.title}
            score={e.score}
            type={e.type}
          />
        </Link>
      </li>
    );
  });
  return (
    <div className=" text-white">
      <div className="flex items-center justify-between mb-5 text-lg">
        <h1 className="text-xl font-bold">{title}</h1>
        <div className="flex justify-between gap-1 items-center">
          <h1 className="text-base">
            <Link onClick={scrollTop} to={to}>
              See all
            </Link>
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-3 h-3"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
      </div>
      <div className=" relative overflow-hidden rounded-md">
        <ul
          className="flex overflow-auto scroll-smooth gap-5 no-scrollbar"
          ref={scrollRef}
        >
          {cards}
        </ul>
        <button
          name="previos"
          className={
            activePageIndex == 0
              ? "hidden"
              : "" +
                "text-white text-2xl absolute top-0 h-full bg-gradient-to-l from-transparent to-gray-950 w-[60px] md:w-[100px]"
          }
          onClick={() =>
            activePageIndex == 0 ? goTo(pages.length - 1) : prev()
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
        <button
          name="next"
          className={
            activePageIndex == pages.length - 1
              ? "hidden"
              : "" +
                "text-white flex flex-row-reverse items-center text-2xl absolute top-0 right-0 h-full bg-gradient-to-r from-transparent to-gray-950 w-[60px] md:w-[100px]"
          }
          onClick={() =>
            activePageIndex + 1 == pages.length ? goTo(0) : next()
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <div className="text-white text-center mt-4">
          {activePageIndex + 1} / {pages.length}
        </div>
      </div>
    </div>
  );
}
