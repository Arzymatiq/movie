import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/home/HomePage";
import OneMovie from "../components/home/movies/OneMovie";
import SeriesList from "../components/home/series/SeriesList";
import SeriesDesc from "../components/home/series/SeriesDesc";
import RegisterForm from "../components/user/RegisterForm";
import LoginForm from "../components/user/LoginForm";

const MainRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/movie/:id" element={<OneMovie />} />
            <Route path="/series" element={<SeriesList />} />
            <Route path="/series/:id" element={<SeriesDesc />} />
        </Routes>
    );
};

export default MainRouter;
