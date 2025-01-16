import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { post_api, api_key } from "../../helpers/consts";
import { RootState } from "../store";
import { ISeries, IMovie, IActors, ISeriesDetails } from "../types/types";
interface GetParams {
    search?: string;
    currentPage?: number;
    itemsPerPage?: number;
}

interface GetMovieResponse {
    results: IMovie[];
    total_pages: number;
}

export const getOneMovie = createAsyncThunk<{ movie: IMovie }, string>(
    "products/getOneMovie",
    async (id: string, { rejectWithValue }) => {
        try {
            const movieResponse = await axios.get(
                `${post_api}/movie/${id}?language=en-US&${api_key}`
            );

            return {
                movie: movieResponse.data as IMovie,
            };
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getActors = createAsyncThunk<
    { actorsCast: IActors[]; actorsCrew: IActors[] },
    string
>("products/getActors", async (id: string, { rejectWithValue }) => {
    try {
        const actorResponse = await axios.get(
            `${post_api}/movie/${id}/credits?language=en-US&${api_key}`
        );

        return {
            actorsCast: actorResponse.data.cast as IActors[],
            actorsCrew: actorResponse.data.crew as IActors[],
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
    console.log(`${post_api}/discover/movie?${paginationParams}&${api_key}`);

    const response = await axios.get(
        `${post_api}/discover/movie?${paginationParams}&${api_key}`
    );
    console.log(response.request);

    return {
        results: response.data.results,
        total_pages: response.data.total_pages,
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
    const response = await axios.get(
        `${post_api}/discover/tv?${paginationParams}&${api_key}`
    );
    return {
        results: response.data.results,
        total_pages: response.data.total_pages,
    };
});

export const getOneSeries = createAsyncThunk<ISeries, string>(
    "products/getOneSeries",
    async (id: string) => {
        const proverka = `${post_api}/tv/${id}?language=en-US&${api_key}`;
        console.log(proverka);
        const response = await axios.get(
            `${post_api}/tv/${id}?language=en-US&${api_key}`
        );
        return response.data as ISeries;
    }
);
interface SeasonProps {
    id: string;
    season_number: number;
}

export const getOneSeriesDetails = createAsyncThunk<
    ISeriesDetails,
    SeasonProps,
    { rejectValue: string }
>(
    "products/getOneSeriesDetails",
    async ({ id, season_number }: SeasonProps, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${post_api}/tv/${id}/season/${season_number}?language=en-US&${api_key}`
            );
            console.log(response);
            return response.data as ISeriesDetails;
        } catch (error) {
            return rejectWithValue("Failed to load series");
        }
    }
);
