import React, { Suspense } from "react";
import Card from "../components/Card";
import { anime, genre } from "../api";
import { useLoaderData, Link, defer, Await } from "react-router-dom";
import Filter from "../components/Filter";
import Pagination from "../components/Paginition";
import loading from "../assets/loading.png";

export function loader({ request }) {
  const pathname = new URL(request.url).searchParams;
  const params = pathname.toString();
  return defer({
    animeData: anime(params, "anime"),
    genreData: genre("anime"),
  });
}

export default function Animes() {
  const data = useLoaderData();
  const typeData = [
    { mal_id: "movie", name: "movie" },
    { mal_id: "tv", name: "tv" },
    { mal_id: "ova", name: "ova" },
    { mal_id: "specail", name: "specail" },
    { mal_id: "ona", name: "ona" },
    { mal_id: "music", name: "music" },
  ];
  const statusData = [
    { mal_id: "airing", name: "airing" },
    { mal_id: "complete", name: "complete" },
    { mal_id: "upcoming", name: "upcoming" },
  ];
  const ratingData = [
    { mal_id: "g", name: "G - All ages" },
    { mal_id: "pg", name: "PG - Children" },
    { mal_id: "pg13", name: "PG-13 - Teens 13 or older" },
    { mal_id: "r17", name: "R - 17+ (violence & profanity)" },
    { mal_id: "r", name: "R+ - Mild Nudity" },
  ];
  const CardsSkeleton = [];
  for (let i = 0; i < 20; i++) {
    CardsSkeleton.push(
      <Card img={loading} title="Title" score="_" type="type" key={i} />
    );
  }
  function Cards(animeData) {
    if (!animeData.data) {
      return <h1 className="text-4xl text-center">NO Animes Found</h1>;
    }
    const card = animeData.data.map((e, i) => {
      return (
        <Card
          img={e?.images?.webp?.large_image_url}
          title={e.title}
          score={e.score}
          type={e.type}
          key={i}
          id={e.mal_id}
        />
      );
    });
    return card;
  }
  return (
    <div className="text-white mt-10">
      <div className="px-5 md:px-10 flex justify-between flex-col md:flex-row items-stretch gap-5 mb-4">
        <Filter title="type" filterData={typeData} />
        <Filter title="status" filterData={statusData} />
        <Filter title="rating" filterData={ratingData} />
        <Suspense fallback={<Filter title="genres" filterData={typeData} />}>
          <Await resolve={data.genreData}>
            {(genreData) => <Filter title="genres" filterData={genreData} />}
          </Await>
        </Suspense>
      </div>
      <Suspense
        fallback={
          <h1 className="text-lg md:text-xl font-bold px-5 md:px-10">
            Animes {"( )"}
          </h1>
        }
      >
        <Await resolve={data.animeData}>
          {(animeData) => (
            <h1 className="text-lg md:text-xl font-bold px-5 md:px-10">
              Animes {"("}
              {animeData?.pagination?.items?.total
                ? animeData?.pagination?.items?.total
                : 0}
              {")"}
            </h1>
          )}
        </Await>
      </Suspense>
      <div className="p-5 md:p-10 flex flex-wrap justify-between gap-3 md:gap-5 text-white">
        <Suspense fallback={CardsSkeleton}>
          <Await resolve={data.animeData}>{Cards}</Await>
        </Suspense>
      </div>
      <div className="flex gap-2 p-5 md:p-10 justify-center items-center mb-10">
        <Suspense
          fallback={<Pagination to="animes" curentPage="0" lastPage="0" />}
        >
          <Await resolve={data.animeData}>
            {(animeData) => (
              <Pagination
                to="animes"
                curentPage={
                  animeData?.pagination?.current_page
                    ? animeData?.pagination?.current_page
                    : 0
                }
                lastPage={
                  animeData?.pagination?.last_visible_page
                    ? animeData?.pagination?.last_visible_page
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
