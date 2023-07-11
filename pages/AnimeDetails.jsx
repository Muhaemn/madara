import React, { Suspense, useEffect } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import { animeDetails } from "../api";
import AnimeDetailsSkeleton from "../skeleton/AnimeDetailsSkeleton";

export async function loader({ params }) {
  return defer({ animeDetail: animeDetails(params.id, "anime") });
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
        </div>
        <div className="p-10 text-white">
          <div className="flex justify-between items-center gap-5 flex-col md:flex-row-reverse">
            <div className="border-[5px] rounded-md border-gray-900">
              <img
                className=" w-[350px] h-[500px] object-coverv rounded-sm"
                src={animeDetail.images.webp.large_image_url}
                alt="img"
              />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-4xl">
                {animeDetail.title_english
                  ? animeDetail.title_english
                  : animeDetail.title}
              </h1>
              <h1 className="text-md tracking-wider">
                Type: {animeDetail.type}
              </h1>
              <h1 className="text-md tracking-wider">
                Source: {animeDetail.source ? animeDetail.source : "N/A"}
              </h1>
              <h1 className="text-md tracking-wider">
                Status: {animeDetail.status ? animeDetail.status : "N/A"}
              </h1>
              <h1 className="text-md tracking-wider">
                Epsodies: {animeDetail.episodes ? animeDetail.episodes : "N/A"}
              </h1>
              <h1 className="text-md tracking-wider">
                Aired:{" "}
                {animeDetail.aired.string ? animeDetail.aired.string : "N/A"}
              </h1>
              <h1 className="text-md tracking-wider">
                Duration: {animeDetail.duration ? animeDetail.duration : "N/A"}
              </h1>
              <h1 className="text-md tracking-wider">
                Rating: {animeDetail.rating ? animeDetail.rating : "N/A"}
              </h1>
              <h1 className="text-md tracking-wider">
                Score:{" "}
                {animeDetail.score
                  ? animeDetail.score +
                    " from " +
                    animeDetail.scored_by +
                    " Voiting"
                  : "N/A"}
              </h1>
              <h1 className="text-md tracking-wider">
                Geners:{" "}
                {genre(animeDetail.genres) ? genre(animeDetail.genres) : "N/A"}
              </h1>
              <a
                href={animeDetail.url}
                className="bg-[#2D4E9D] inline-block rounded-md px-5 py-3 text-center font-bold "
                target="_blanck"
              >
                See On MAL
              </a>
            </div>
          </div>
          <div className="w-full mt-10">
            <h1 className="font-bold text-4xl my-5">About</h1>
            <h1>{animeDetail.synopsis}</h1>
          </div>
          <div className="flex justify-center items-center mt-10">
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
    <Suspense fallback={<AnimeDetailsSkeleton />}>
      <Await resolve={data.animeDetail}>{details}</Await>
    </Suspense>
  );
}
