import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Layout() {
  const [anime, setAnime] = useState(false);
  const [manga, setManga] = useState(false);
  return (
    <>
      <nav className="flex justify-between items-center px-10 py-4 bg-gray-950 bg-opacity-50 text-white flex-col md:flex-row gap-5 w-full">
        <h1 className=" text-2xl">
          <Link to="">
            <img
              src={logo}
              alt="logo"
              className="min-w-[100px] max-w-[100px]"
            />
          </Link>
        </h1>
        <ul className=" flex justify-between text-lg items-center gap-6">
          <li className=" list-none">
            <Link to="">Home page</Link>
          </li>
          <li
            onClick={() => setAnime((prev) => !prev)}
            className="relative list-none flex items-center gap-2 cursor-pointer"
          >
            Animes
            <div
              className={
                " bg-gray-900 max-h-[300px] text-base rounded-md no-scrollbar flex-col gap-2 items-stretch w-32 absolute p-2 z-50 top-8 " +
                (anime ? "flex" : "hidden")
              }
            >
              <Link to="animes">All Animes</Link>
              <Link to="top/animes">Top Animes</Link>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-3 h-3 -mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  !anime
                    ? "M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                    : "M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                }
              />
            </svg>
          </li>
          <li
            onClick={() => setManga((prev) => !prev)}
            className="relative list-none flex items-center gap-2 cursor-pointer"
          >
            Mangas
            <div
              className={
                " bg-gray-900 max-h-[300px] text-base rounded-md no-scrollbar flex-col gap-2 items-stretch w-32 absolute p-2 z-50 top-8 " +
                (manga ? "flex" : "hidden")
              }
            >
              <Link to="mangas">All Mangas</Link>
              <Link to="top/mangas">Top Mangas</Link>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={3}
              stroke="currentColor"
              className="w-3 h-3 -mb-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  !manga
                    ? "M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                    : "M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                }
              />
            </svg>
          </li>
          <li className=" list-none">
            <Link to="season">Season</Link>
          </li>
        </ul>
        <div className="flex justify-between items-center gap-4">
          <div className="relative text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-outline"
              >
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  className="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
            </span>
            <input
              type="text"
              className="py-2 text-sm text-white bg-gray-900 rounded-md pl-10 focus:outline-none"
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
          {/* <p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          </p> */}
        </div>
      </nav>
      <Outlet />
    </>
  );
}
