import React, { Suspense, useEffect } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import { animeDetails, recommendation } from "../api";
import AnimeDetailsSkeleton from "../skeleton/AnimeDetailsSkeleton";
import CardSlide from "../components/CardSlideRecommendation";
import CardSlideSkeleton from "../skeleton/CardSlideSkeleton";

export async function loader({ params }) {
  return defer({
    animeDetail: animeDetails(params.id, "anime"),
    animeRecommendations: recommendation("anime", params.id),
  });
}

export default function AnimeDetails() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const data = useLoaderData();
  const genre = (data) => {
    let g = "";
    data.forEach((e) => {
      g += e.name + " | ";
    });
    return g.substring(0, g.length - 3);
  };
  function details(animeDetail) {
    return (
      <>
        <div className=" relative">
          <div className="w-full h-10 bg-gradient-to-t absolute z-[-9]  from-transparent to-gray-950"></div>
          <img
            className="h-[100vh] w-full absolute -z-10 object-cover opacity-5"
            src={animeDetail.images.webp.large_image_url}
            alt="img"
          />
          <div className=" absolute h-[100vh] w-full">
            <div className="w-full h-10 bg-gradient-to-b absolute z-[-9] bottom-0   from-transparent to-gray-950"></div>
          </div>
        </div>
        <div className="p-5 md:p-10 text-gray-400">
          <div className="flex justify-between items-center gap-5 flex-col md:flex-row-reverse">
            <div className="border-[5px] rounded-md border-gray-900">
              <img
                className=" w-[350px] h-[500px] object-coverv rounded-sm"
                src={animeDetail.images.webp.large_image_url}
                alt="img"
              />
            </div>
            <div className="flex flex-col gap-5 md:w-[50vw]">
              <h1 className="font-bold text-4xl sm:text-5xl">
                {animeDetail.title_english
                  ? animeDetail.title_english
                  : animeDetail.title}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Type:</span> {animeDetail.type}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Source:</span>{" "}
                {animeDetail.source ? animeDetail.source : "N/A"}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Status:</span>{" "}
                {animeDetail.status ? animeDetail.status : "N/A"}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Episodes:</span>{" "}
                {animeDetail.episodes ? animeDetail.episodes : "N/A"}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Aired:</span>{" "}
                {animeDetail.aired.string ? animeDetail.aired.string : "N/A"}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Duration:</span>{" "}
                {animeDetail.duration ? animeDetail.duration : "N/A"}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Rating:</span>{" "}
                {animeDetail.rating ? animeDetail.rating : "N/A"}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Score:</span>{" "}
                {animeDetail.score
                  ? animeDetail.score +
                    " from " +
                    animeDetail.scored_by +
                    " Voiting"
                  : "N/A"}
              </h1>
              <h1 className="text-lg tracking-wider">
                <span className="font-bold">Genres:</span>{" "}
                {genre(animeDetail.genres) ? genre(animeDetail.genres) : "N/A"}
              </h1>
              <a
                href={animeDetail.url}
                className="bg-[#2D4E9D] text-white inline-block rounded-md px-5 py-3 text-center font-bold "
                target="_blanck"
              >
                See On MAL
              </a>
            </div>
          </div>
          <div className="w-full mt-10">
            <h1 className="font-bold text-2xl sm:text-3xl my-5">About</h1>
            <h1 className="text-lg tracking-wider">{animeDetail.synopsis}</h1>
          </div>
          <div className="flex justify-center flex-col items-center mt-10">
            <h1 className="font-bold text-2xl sm:text-3xl my-5 self-start">
              trailer
            </h1>
            <iframe
              className="w-full aspect-video rounded-md"
              src={
                animeDetail.trailer.embed_url
                  ? animeDetail.trailer.embed_url.substring(
                      0,
                      animeDetail.trailer.embed_url.length - 11
                    )
                  : "https://www.youtube.com/embed/dQw4w9WgXcQ"
              }
              title={animeDetail.title_english}
              frameBorder="0"
              allow="fullscreen;"
            ></iframe>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<AnimeDetailsSkeleton />}>
        <Await resolve={data.animeDetail}>{details}</Await>
      </Suspense>
      <Suspense fallback={<CardSlideSkeleton />}>
        <Await resolve={data.animeRecommendations}>
          {(data) => {
            if (data.length === 0) {
              return "";
            }
            return (
              <div className="p-5 md:p-10">
                <CardSlide
                  data={data}
                  title="Recommendations"
                  to={"/madara/animes"}
                />
              </div>
            );
          }}
        </Await>
      </Suspense>
    </>
  );
}
