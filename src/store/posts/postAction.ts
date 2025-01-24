import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { post_api, api_key } from "../../helpers/consts";
import { RootState } from "../store";
import { ISeries, IMovie, IActors, ISeasonDesc } from "../types/types";
import apiPost from "../../helpers/apiPost";
interface GetParams {
    search?: string;
    currentPage?: number;
    itemsPerPage?: number;
    language?: string;
}

interface GetMovieResponse {
    results: IMovie[];
    total_pages: number;
    language?: string;
}

interface getOneProps {
    id: string;
    language?: string;
}

export const getOneMovie = createAsyncThunk<{ movie: IMovie }, getOneProps>(
    "products/getOneMovie",
    async ({ id, language }: getOneProps, { rejectWithValue }) => {
        try {
            const movieResponse = await apiPost.get(
                `/movie/${id}?language=${language}&${api_key}`
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
    getOneProps
>("products/getActors", async ({ id, language }, { rejectWithValue }) => {
    try {
        const actorResponse = await apiPost.get(
            `/movie/${id}/credits?language=${language}&${api_key}`
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
    { rejectValue: string }
>(
    "products/getMovie",
    async ({ currentPage, language }: GetParams, { rejectWithValue }) => {
        const page = currentPage && currentPage > 500 ? 500 : currentPage;

        const paginationParams = `page=${page}`;

        const response = await apiPost.get(
            `/discover/movie?${paginationParams}&${api_key}&language=${language}`
        );
        return {
            results: response.data.results,
            total_pages: response.data.total_pages,
        };
    }
);

interface GetSeriesResponse {
    results: ISeries[];
    total_pages: number;
    language?: string;
}

export const getSeries = createAsyncThunk<
    GetSeriesResponse,
    GetParams,
    { state: RootState }
>("products/getSeries", async ({ currentPage, language }: GetParams) => {
    const page = currentPage && currentPage > 500 ? 500 : currentPage;
    const paginationParams = `page=${page}`;
    const response = await apiPost.get(
        `/discover/tv?${paginationParams}&${api_key}&language=${language}`
    );
    return {
        results: response.data.results,
        total_pages: response.data.total_pages,
    };
});

export const getOneSeries = createAsyncThunk<ISeries, getOneProps>(
    "products/getOneSeries",
    async ({ id, language }: getOneProps) => {
        const response = await axios.get(
            `${post_api}/tv/${id}?language=${language}&${api_key}`
        );
        return response.data as ISeries;
    }
);

interface SeasonProps {
    id: string;
    season_number: number;
    language?: string;
}

export const getOneSeriesDetails = createAsyncThunk<
    ISeasonDesc,
    SeasonProps,
    { rejectValue: string }
>(
    "products/getOneSeriesDetails",
    async (
        { id, season_number, language }: SeasonProps,
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(
                `${post_api}/tv/${id}/season/${season_number}?language=${language}&${api_key}`
            );
            console.log(response);
            return response.data as ISeasonDesc;
        } catch (error) {
            return rejectWithValue("Failed to load series");
        }
    }
);
