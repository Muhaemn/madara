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
      <nav className="flex justify-between items-center px-10 py-4 bg-gray-950 bg-opacity-50 text-gray-400 flex-col md:flex-row gap-5 md:gap-10 w-full">
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
              className="py-2 text-md focus:bg-gray-800 transition-all ease-in-out duration-200 w-full text-gray-400 min-w-[320px] md:min-w-full bg-gray-900 rounded-md px-10 outline-none focus:outline-none"
              placeholder="press / to focus"
              autoComplete="off"
            />
          </div>
        </div>
        <ul className=" flex justify-between text-md font-bold sm:text-lg items-center gap-6">
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
      <footer className=" w-full  px-5 md:px-10 ">
        <div className=" flex justify-center items-center rounded-t-md w-full p-3 gap-2 bg-gray-900 ">
          <code className="text-xs font-bold text-gray-500 sm:text-base">
            Developed by Muhaemn
          </code>
          <a
            href="https://www.instagram.com/_muhaemn/"
            target="_blanck"
            title="Instagram"
            alt="instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              fill="currentColor"
              className="bi bi-instagram"
              viewBox="0 0 16 16"
            >
              <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                fill="#6b7280"
              ></path>{" "}
            </svg>
          </a>

          <a
            href="https://github.com/Muhaemn"
            target="_blanck"
            title="Github"
            alt="Github"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-github"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="#6b7280"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />{" "}
              <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />{" "}
            </svg>
          </a>
        </div>
      </footer>
    </>
  );
}
