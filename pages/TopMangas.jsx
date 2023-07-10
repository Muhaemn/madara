import React, { Suspense } from "react";
import Card from "../components/Card";
import { top } from "../api";
import { useLoaderData, Link, defer, Await } from "react-router-dom";
import Filter from "../components/Filter";
import Pagination from "../components/Paginition";
import loading from "../assets/loading.png";

export function loader({ request }) {
  const pathname = new URL(request.url).searchParams;
  const params = pathname.toString();
  return defer({
    mangaData: top(params, "manga"),
  });
}

export default function TopMangas() {
  const data = useLoaderData();
  const typeData = [
    { mal_id: "manga", name: "manga" },
    { mal_id: "novel", name: "novel" },
    { mal_id: "lightnovel", name: "lightnovel" },
    { mal_id: "oneshot", name: "oneshot" },
    { mal_id: "doujin", name: "doujin" },
    { mal_id: "manhwa", name: "manhwa" },
    { mal_id: "manhua", name: "manhua" },
  ];
  const CardsSkeleton = [];
  for (let i = 0; i < 20; i++) {
    CardsSkeleton.push(
      <Card img={loading} title="Title" score="_" type="type" key={i} />
    );
  }
  function Cards(mangaData) {
    if (!mangaData.data) {
      return <h1 className="text-4xl text-center">NO Mangas Found</h1>;
    }
    const card = mangaData.data.map((e, i) => {
      return (
        <Card
          img={e?.images?.webp?.large_image_url}
          title={e.title}
          score={e.score}
          type={e.type}
          key={i}
        />
      );
    });
    return card;
  }
  return (
    <div className="text-white mt-10">
      <div className="px-5 md:px-10 flex justify-between flex-col md:flex-row items-stretch gap-5 mb-4">
        <Filter title="type" from="top/mangas" filterData={typeData} />
      </div>
      <Suspense
        fallback={
          <h1 className="text-lg md:text-xl font-bold px-5 md:px-10">
            Top Mangas
          </h1>
        }
      >
        <Await resolve={data.mangaData}>
          {(mangaData) => (
            <h1 className="text-lg md:text-xl font-bold px-5 md:px-10">
              Top Mangas {"("}
              {mangaData?.pagination?.items?.total
                ? mangaData?.pagination?.items?.total
                : 0}
              {")"}
            </h1>
          )}
        </Await>
      </Suspense>
      <div className="p-5 md:p-10 flex flex-wrap justify-between gap-3 md:gap-5 text-white">
        <Suspense fallback={CardsSkeleton}>
          <Await resolve={data.mangaData}>{Cards}</Await>
        </Suspense>
      </div>
      <div className="flex gap-2 p-5 md:p-10 justify-center items-center mb-10">
        <Suspense
          fallback={<Pagination to="top/mangas" curentPage="0" lastPage="0" />}
        >
          <Await resolve={data.mangaData}>
            {(mangaData) => (
              <Pagination
                to="top/mangas"
                curentPage={
                  mangaData?.pagination?.current_page
                    ? mangaData?.pagination?.current_page
                    : 0
                }
                lastPage={
                  mangaData?.pagination?.last_visible_page
                    ? mangaData?.pagination?.last_visible_page
                    : 0
                }
              />
            )}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
