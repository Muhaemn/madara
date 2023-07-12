import React, { Suspense, useEffect } from "react";
import { useLoaderData, Await, defer } from "react-router-dom";
import { characterDetails } from "../api";
import CharacterDetailsSkeleton from "../skeleton/CharacterDetailsSkeleton";

export async function loader({ params }) {
  return defer({
    characterDetails: characterDetails(params.id),
  });
}

export default function MangaDetails() {
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);
  const data = useLoaderData();
  function details(animeDetail) {
    return (
      <>
        <div className=" relative">
          <div className="w-full h-10 bg-gradient-to-t absolute z-[-9]  from-transparent to-gray-950"></div>
          <img
            className="h-[100vh] w-full absolute -z-10 object-cover opacity-5"
            src={animeDetail.images.webp.image_url}
            alt="img"
          />
          <div className=" absolute h-[100vh] w-full">
            <div className="w-full h-10 bg-gradient-to-b absolute z-[-9] bottom-0   from-transparent to-gray-950"></div>
          </div>
        </div>
        <div className="p-5 md:p-10 text-gray-400">
          <div className="flex justify-between items-center gap-5 flex-col">
            <div className="border-[5px] rounded-md border-gray-900">
              <img
                className=" w-[350px] h-[500px] object-coverv rounded-sm"
                src={animeDetail.images.webp.image_url}
                alt="img"
              />
            </div>
            <div className="flex flex-col gap-5">
              <h1 className="font-bold text-4xl sm:text-5xl">
                {animeDetail.name}
              </h1>
              <a
                href={animeDetail.url}
                className="bg-[#2D4E9D] text-white rounded-md px-5 py-3 text-center font-bold "
                target="_blanck"
              >
                See On MAL
              </a>
            </div>
          </div>
          <div className="w-full mt-10">
            <h1 className="font-bold text-2xl sm:text-3xl my-5">About</h1>
            <h1 className="text-lg tracking-wider">{animeDetail.about}</h1>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Suspense fallback={<CharacterDetailsSkeleton />}>
        <Await resolve={data.characterDetails}>{details}</Await>
      </Suspense>
    </>
  );
}
