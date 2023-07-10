import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useSearchParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import DropDown from "./DropDown";

export default function Layout() {
  const [search, setSearch] = useState("");
  const [params] = useSearchParams();
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (params.has("q")) {
      setSearch(params.get("q"));
    } else {
      setSearch("");
    }
    const handlePress = (event) => {
      if (event.key === "/") {
        inputRef.current.focus();
      }
    };
    window.addEventListener("keyup", handlePress);

    return () => {
      window.removeEventListener("keyup", handlePress);
    };
  }, [params]);
  function handleKey(e) {
    if (e.key === "Enter") {
      inputRef.current.blur();
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
          <DropDown
            title="Animes"
            l1="All Animes"
            l2="Top Animes"
            to="animes"
          />
          <DropDown
            title="Mangas"
            l1="All Mangas"
            l2="Top Mangas"
            to="mangas"
          />
          <li className=" list-none">
            <Link to="season">Season</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
