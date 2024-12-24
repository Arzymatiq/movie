import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import React, { Suspense, lazy } from "react";
import Layout from "../components/layOut/Layout";
import Error from "../components/error/Error";

const MoviesList = lazy(() => import("../components/home/movies/MoviesList"));
const OneMovie = lazy(() => import("../components/home/movies/OneMovie"));
const SeriesList = lazy(() => import("../components/home/series/SeriesList"));
const SeriesDesc = lazy(() => import("../components/home/series/SeriesDesc"));
const RegisterForm = lazy(() => import("../components/user/RegisterForm"));
const LoginForm = lazy(() => import("../components/user/LoginForm"));

const ROUTES = [
    { id: 1, path: "/", element: <MoviesList /> },
    { id: 2, path: "/register", element: <RegisterForm /> },
    { id: 3, path: "/login", element: <LoginForm /> },
    { id: 4, path: "/movie/:id", element: <OneMovie /> },
    { id: 5, path: "/series", element: <SeriesList /> },
    { id: 6, path: "/series/:id", element: <SeriesDesc /> },
];

const MainRouter = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Layout />}>
                {ROUTES.map(({ id, path, element }) => (
                    <Route key={id} path={path} element={element} />
                ))}
                <Route path="*" element={<Error />} />
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
