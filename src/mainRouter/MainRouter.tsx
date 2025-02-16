import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import Layout from "../components/layOut/Layout";
import NotFoundPage from "../components/error/NotFoundPage";
// import OneSeries from "../components/home/series/OneSeries";

const MoviesList = lazy(() => import("../components/home/movies/MoviesList"));
const OneMovie = lazy(() => import("../components/home/movies/OneMovie"));
const RegisterForm = lazy(() => import("../components/user/RegisterForm"));
const LoginForm = lazy(() => import("../components/user/LoginForm"));
const SeriesDetails = lazy(
  () => import("../components/home/series/seriesDetails/SeriesDetails")
);
const OneSeries = lazy(() => import("../components/home/series/OneSeries"));

const ROUTES = [
  { id: 1, path: "/", element: <MoviesList /> },
  { id: 5, path: "/:state", element: <MoviesList /> },
  { id: 2, path: "/register", element: <RegisterForm /> },
  { id: 3, path: "/login", element: <LoginForm /> },
  { id: 4, path: "/movie/:id", element: <OneMovie /> },
  { id: 6, path: "/series/:id", element: <OneSeries /> },
  {
    id: 6,
    path: "series/:id/:season_number",
    element: <SeriesDetails />
  }
];

const MainRouter = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        {ROUTES.map(({ id, path, element }) => (
          <Route key={id} path={path} element={element} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
  );
};

export default MainRouter;
