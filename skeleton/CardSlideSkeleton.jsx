import React from "react";
import { useSnapCarousel } from "react-snap-carousel";
import CardHome from "../components/CardHome";
import loading from "../assets/loading.png";
export default function cardSlideSkeleton() {
  const { scrollRef, pages, activePageIndex, next, prev, goTo } =
    useSnapCarousel();
  const cards = [];
  for (let i = 0; i < 6; i++) {
    cards.push(
      <li key={i}>
        <CardHome img={loading} title="Title" score="Score" type="type" />
      </li>
    );
  }
  return (
    <div className=" text-white">
      <div className="flex justify-between mb-5 text-lg">
        <h1>Loading</h1>
        <div className="flex justify-between gap-1 items-center">
          <h1 className="text-base">See All</h1>
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
          className={
            activePageIndex == pages.length - 1
              ? "hidden"
              : "" +
                "text-white text-2xl flex flex-row-reverse items-center absolute top-0 right-0 h-full bg-gradient-to-r from-transparent to-gray-950 w-[60px] md:w-[100px]"
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
