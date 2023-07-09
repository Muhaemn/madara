import React, { useRef } from "react";

import {
  SnapList,
  SnapItem,
  useVisibleElements,
  useScroll,
  useDragToScroll,
  isTouchDevice,
} from "react-snaplist-carousel";
import CardHome from "./CardHome";
import { Link } from "react-router-dom";
import CardSlideSkeleton from "../skeleton/CardSlideSkeleton";

export default function SlideTest({ data, title }) {
  const snapList = useRef(null);

  const visible = useVisibleElements(
    { debounce: 10, ref: snapList },
    ([element]) => element
  );
  const goToSnapItem = useScroll({ ref: snapList });
  const { isDragging } = useDragToScroll({ ref: snapList });
  if (!data) {
    return <CardSlideSkeleton />;
  }
  const cards = data.map((e, i) => {
    return (
      <SnapItem
        key={i}
        margin={{ left: "10px", right: "10px" }}
        snapAlign="start"
      >
        <li onClick={() => goToSnapItem(i)}>
          <CardHome
            img={e?.images?.jpg?.large_image_url}
            title={e.title}
            score={e.score}
            type={e.type}
          />
        </li>
      </SnapItem>
    );
  });

  return (
    <div className=" text-white">
      <div className="flex justify-between mb-5 text-lg">
        <h1 className="text-xl font-bold">
          {title[0].toUpperCase() + title.substring(1)}
        </h1>
        <h1 className="text-base">
          <Link to={"/" + title.toLowerCase()}>See all</Link>
        </h1>
      </div>
      <div className=" relative overflow-hidden rounded-md">
        <ul className="flex overflow-auto scroll-smooth gap-5 no-scrollbar">
          <SnapList ref={snapList}>{cards}</SnapList>
        </ul>
      </div>
    </div>
  );
}
