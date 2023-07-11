import React, { Suspense } from "react";
import { useLoaderData, defer, Await } from "react-router-dom";
import Hero from "../components/Hero";
import { random, season, top } from "../api";
import CardSlide from "../components/CardSlide";
import CardSlideSkeleton from "../skeleton/CardSlideSkeleton";
import HeroSkeleton from "../skeleton/HeroSkeleton";

export function loader({ request }) {
  const pathname = new URL(request.url).searchParams;
  const params = pathname.toString();
  return defer({
    topAnime: top(params, "anime"),
    topManga: top(params, "manga"),
    seasonAnime: season(),
  });
}

export default function Home() {
  const data = useLoaderData();
  function getRandom() {
    return Math.floor(Math.random() * 26);
  }
  return (
    <div className="p-5 md:p-10 grid grid-cols-1 gap-10">
      <Suspense fallback={<HeroSkeleton />}>
        <Await resolve={data.seasonAnime}>
          {(randomAnime) => {
            if (randomAnime && randomAnime?.data !== undefined) {
              randomAnime = randomAnime?.data[getRandom()];
              return (
                <Hero
                  id={randomAnime.mal_id}
                  img={randomAnime?.images?.webp?.large_image_url}
                  title={randomAnime.title}
                  synopsis={
                    randomAnime.synopsis && randomAnime.synopsis.length > 300
                      ? randomAnime.synopsis.substring(0, 300) + "..."
                      : !randomAnime.synopsis
                      ? "N/A"
                      : randomAnime.synopsis
                  }
                  genre={() => {
                    let g = "";
                    randomAnime.genres.forEach((e) => {
                      g += e.name + " | ";
                    });
                    return g.substring(0, g.length - 3);
                  }}
                />
              );
            } else {
              return <HeroSkeleton />;
            }
          }}
        </Await>
      </Suspense>
      <Suspense fallback={<CardSlideSkeleton />}>
        <Await resolve={data.seasonAnime}>
          {(d) => (
            <CardSlide data={d.data} title="This Season Animes" to="season" />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<CardSlideSkeleton />}>
        <Await resolve={data.topAnime}>
          {(d) => (
            <CardSlide data={d.data} title="Top Animes" to="top/animes" />
          )}
        </Await>
      </Suspense>
      <Suspense fallback={<CardSlideSkeleton />}>
        <Await resolve={data.topManga}>
          {(d) => (
            <CardSlide data={d.data} title="Top Mangas" to="top/mangas" />
          )}
        </Await>
      </Suspense>
    </div>
  );
}
