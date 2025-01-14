import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { post_api } from "../../helpers/consts";
import { RootState } from "../store";
import { ISeries, IMovie, IActors } from "../types/types";

interface GetParams {
    search?: string;
    currentPage?: number;
    itemsPerPage?: number;
}

interface GetMovieResponse {
    results: IMovie[];
    total_pages: number;
}

export const getOneMovie = createAsyncThunk<
    { movie: IMovie; actors: IActors[] },
    string
>("products/getOneMovie", async (id: string, { rejectWithValue }) => {
    try {
        const response = await axios.get(
            `${post_api}/movie/${id}?language=en-US&api_key=69f583eb365b0fba39f4e56aadbe8e55`
        );
        const actorResponse = await axios.get(
            `${post_api}/movie/${id}/credits?language=en-US&api_key=69f583eb365b0fba39f4e56aadbe8e55`
        );
        console.log(actorResponse.data);

        return {
            movie: response.data as IMovie,
            actors: actorResponse.data.cast as IActors[],
        };
    } catch (error) {
        return rejectWithValue(error);
    }
});

export const getMovie = createAsyncThunk<
    GetMovieResponse,
    GetParams,
    { state: RootState }
>("products/getMovie", async ({ currentPage }: GetParams) => {
    const page = currentPage && currentPage > 500 ? 500 : currentPage;
    const paginationParams = `page=${page}`;
    const response = await fetch(
        // --url 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc' \

        `${post_api}/discover/movie?${paginationParams}&api_key=69f583eb365b0fba39f4e56aadbe8e55`
    );
    const data = await response.json();
    console.log(data);

    return {
        results: data.results,
        total_pages: data.total_pages,
    };
});

interface GetSeriesResponse {
    results: ISeries[];
    total_pages: number;
}

export const getSeries = createAsyncThunk<
    GetSeriesResponse,
    GetParams,
    { state: RootState }
>("products/getSeries", async ({ currentPage }: GetParams) => {
    const page = currentPage && currentPage > 500 ? 500 : currentPage;
    const paginationParams = `page=${page}`;
    const response = await fetch(
        `${post_api}/discover/tv?${paginationParams}&api_key=69f583eb365b0fba39f4e56aadbe8e55`
    );
    const data = await response.json();
    console.log(data);

    return {
        results: data.results,
        total_pages: data.total_pages,
    };
});

export const getOneSeries = createAsyncThunk<ISeries, string>(
    "products/getOneSeries",
    async (id: string) => {
        const response = await axios.get(
            `${post_api}/tv/${id}?language=en-US&api_key=69f583eb365b0fba39f4e56aadbe8e55`
        );
        return response.data as ISeries;
    }
);

export const getActors = createAsyncThunk<IActors, string>(
    "products/getActors",
    async (id: string) => {
        const res = await axios.get(`${post_api}/movie/`);
        return res.data as IActors;
    }
);
