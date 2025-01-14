import React, { Suspense, lazy } from "react";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import Layout from "../components/layOut/Layout";
import Error from "../components/error/Error";
import OneSeries from "../components/home/series/OneSeries";

const MoviesList = lazy(() => import("../components/home/movies/MoviesList"));
const OneMovie = lazy(() => import("../components/home/movies/OneMovie"));
const RegisterForm = lazy(() => import("../components/user/RegisterForm"));
const LoginForm = lazy(() => import("../components/user/LoginForm"));
const SeriseList = lazy(() => import("../components/home/series/SeriesList"));
const SeriesItem = lazy(() => import("../components/home/series/SeriesList"));

const ROUTES = [
    { id: 1, path: "/", element: <MoviesList /> },
    { id: 2, path: "/register", element: <RegisterForm /> },
    { id: 3, path: "/login", element: <LoginForm /> },
    { id: 4, path: "/movie/:id", element: <OneMovie /> },
    { id: 5, path: "/series", element: <SeriseList /> },
    { id: 6, path: "/series/:id", element: <OneSeries /> },
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
