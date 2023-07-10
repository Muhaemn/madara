import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useSearchParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Layout() {
  const [anime, setAnime] = useState(false);
  const [manga, setManga] = useState(false);
  const [search, setSearch] = useState("");
  const [params] = useSearchParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const handlePress = (event) => {
      if (event.key === "/") {
        inputRef.current.focus();
      }
    };
    window.addEventListener("keyup", handlePress);
    return () => {
      window.removeEventListener("keyup", handlePress);
    };
  }, []);
  function handleKey(e) {
    if (e.key === "Enter") {
      navigate(`/madara/animes${searchParams("q", search)}`);
    }
  }
  function searchParams(key, value) {
    const sp = new URLSearchParams(params);
    sp.delete("page");
    if (value === null) {
      sp.delete(key);
    } else {
      sp.set(key, value);
    }
    return `?${sp.toString()}`;
  }
  return (
    <>
      <nav className="flex justify-between items-center px-10 py-4 bg-gray-950 bg-opacity-50 text-white flex-col md:flex-row gap-5 md:gap-10 w-full">
        <div className=" text-2xl">
          <Link to="">
            <img
              src={logo}
              alt="logo"
              className="min-w-[100px] max-w-[100px]"
            />
          </Link>
        </div>

        <div className="flex grow justify-between items-center gap-4">
          <div className="relative w-full text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-2">
              <Link
                to={"/madara/animes" + searchParams("q", search)}
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
              </Link>
            </span>
            <input
              type="text"
              onKeyUp={handleKey}
              ref={inputRef}
              value={search}
              onChange={(e) =>
                setSearch((prev) => {
                  return e.target.value != "/" ? e.target.value : prev;
                })
              }
              className="py-2 text-sm w-full text-white min-w-[320px] md:min-w-full bg-gray-900 rounded-md px-10 focus:outline-none"
              placeholder="press / to focus"
              autoComplete="off"
            />
          </div>
        </div>
        <ul className=" flex justify-between text-md sm:text-lg items-center gap-6">
          <li className=" list-none">
            <Link to="">Home</Link>
          </li>
          <li
            onClick={() => setAnime((prev) => !prev)}
            className="relative list-none flex items-center gap-2 cursor-pointer"
          >
            Animes
            <div
              className={
                " bg-gray-900 max-h-[300px] border border-gray-950 text-base rounded-md no-scrollbar flex-col gap-2 items-stretch w-32 absolute p-2 z-50 top-8 " +
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
                " bg-gray-900 max-h-[300px] border border-gray-950 text-base rounded-md no-scrollbar flex-col gap-2 items-stretch w-32 absolute p-2 z-50 top-8 " +
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
      </nav>
      <Outlet />
    </>
  );
}
