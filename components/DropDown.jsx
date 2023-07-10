import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function useOutsideAlerter(ref) {
  const [anime, setAnime] = useState(false);
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setAnime(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
  return [anime, setAnime];
}

export default function DropDown({ title, l1, l2, to }) {
  const wrapperRef = useRef(null);
  const [anime, setAnime] = useOutsideAlerter(wrapperRef);

  return (
    <div ref={wrapperRef}>
      <li
        onClick={() => setAnime((prev) => !prev)}
        className="relative list-none flex items-center gap-2 cursor-pointer"
      >
        {title}
        <div
          className={
            " bg-gray-900 max-h-[300px] border border-gray-950 text-base rounded-md no-scrollbar flex-col gap-2 items-stretch w-32 absolute p-2 z-50 top-8 " +
            (anime ? "flex" : "hidden")
          }
        >
          <Link to={to}>{l1}</Link>
          <Link to={"top/" + to}>{l2}</Link>
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
    </div>
  );
}
