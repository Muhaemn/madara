import React, { Suspense } from "react";
import Card from "../components/Card";
import { season } from "../api";
import { useLoaderData, Link, defer, Await } from "react-router-dom";
import Pagination from "../components/Paginition";
import loading from "../assets/loading.png";

export function loader({ request }) {
  const pathname = new URL(request.url).searchParams;
  const params = pathname.toString();
  return defer({ seasonData: season(params) });
}

export default function Season() {
  const data = useLoaderData();
  const CardsSkeleton = [];
  for (let i = 0; i < 20; i++) {
    CardsSkeleton.push(
      <Card img={loading} title="Title" score="_" type="type" key={i} />
    );
  }
  function Cards(seasonData) {
    if (!seasonData.data) {
      return <h1 className="text-4xl text-center">NO Animes Found</h1>;
    }
    const card = seasonData.data.map((e, i) => {
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
    <div className="text-gray-400 mt-10">
      <Suspense
        fallback={
          <h1 className="text-lg md:text-xl font-bold px-5 md:px-10">
            This Season's Animes {"( )"}
          </h1>
        }
      >
        <Await resolve={data.seasonData}>
          {(seasonData) => (
            <h1 className="text-lg md:text-xl font-bold px-5 md:px-10">
              This Season's Animes {"("}
              {seasonData?.pagination?.items?.total
                ? seasonData?.pagination?.items?.total
                : 0}
              {")"}
            </h1>
          )}
        </Await>
      </Suspense>
      <div className="p-5 md:p-10 flex flex-wrap justify-between gap-3 md:gap-5 text-gray-400">
        <Suspense fallback={CardsSkeleton}>
          <Await resolve={data.seasonData}>{Cards}</Await>
        </Suspense>
      </div>
      <div className="flex gap-2 p-5 md:p-10 justify-center items-center mb-10">
        <Suspense
          fallback={<Pagination to="season" curentPage="0" lastPage="0" />}
        >
          <Await resolve={data.seasonData}>
            {(seasonData) => (
              <Pagination
                to="season"
                curentPage={
                  seasonData?.pagination?.current_page
                    ? seasonData?.pagination?.current_page
                    : 0
                }
                lastPage={
                  seasonData?.pagination?.last_visible_page
                    ? seasonData?.pagination?.last_visible_page
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
