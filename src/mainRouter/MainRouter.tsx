import { Route, Routes } from "react-router-dom";
import MoviesList from "../components/home/movies/MoviesList";
import OneMovie from "../components/home/movies/OneMovie";
import SeriesList from "../components/home/series/SeriesList";
import SeriesDesc from "../components/home/series/SeriesDesc";
import RegisterForm from "../components/user/RegisterForm";
import LoginForm from "../components/user/LoginForm";

const MainRouter = () => {
    const ROUTES = [
        {
            id: 1,
            path: "/",
            element: <MoviesList />,
        },
        {
            id: 2,
            path: "/register",
            element: <RegisterForm />,
        },
        {
            id: 3,
            path: "/login",
            element: <LoginForm />,
        },
        {
            id: 4,
            path: "/movie/:id",
            element: <OneMovie />,
        },
        {
            id: 5,
            path: "/series",
            element: <SeriesList />,
        },
        {
            id: 6,
            path: "/series/:id",
            element: <SeriesDesc />,
        },
    ];
    return (
        <Routes>
            {ROUTES.map((item) => (
                <Route path={item.path} key={item.id} element={item.element} />
            ))}
        </Routes>
    );
};

export default MainRouter;
