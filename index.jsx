import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Layout from "./components/layout";
import Home, { loader as loaderHome } from "./pages/Home";
import Animes, { loader as loaderAnimes } from "./pages/Animes";
import Mangas, { loader as loaderMangas } from "./pages/Mangas";
import Season, { loader as loaderSeason } from "./pages/Season";
import TopAnimes, { loader as loaderTopAnimes } from "./pages/TopAnimes";
import TopMangas, { loader as loaderTopMangas } from "./pages/TopMangas";
import Error from "./pages/Error";
import ErrorElement from "./pages/ErrorElement";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/madara" errorElement={<ErrorElement />} element={<Layout />}>
      <Route index loader={loaderHome} element={<Home />} />
      <Route path="animes" loader={loaderAnimes} element={<Animes />} />
      <Route path="mangas" loader={loaderMangas} element={<Mangas />} />
      <Route path="season" loader={loaderSeason} element={<Season />} />
      <Route path="top">
        <Route path="animes" loader={loaderTopAnimes} element={<TopAnimes />} />
        <Route path="mangas" loader={loaderTopMangas} element={<TopMangas />} />
      </Route>
      <Route path="*" element={<Error />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
