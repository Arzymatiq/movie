import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { post_api } from "../../helpers/consts";
import { RootState } from "../store";
import { ISeries, IMovie } from "../types/types";

interface GetMovieResponse {
    res: IMovie[];
    totalPages: number;
}
interface GetSeriesResponse {
    res: ISeries[];
    totalPages: number;
}

const getTotalPages = async (url: string): Promise<number> => {
    const res = await axios.get(url);
    return Math.ceil(res.data.length / 18);
};
export const getMovie = createAsyncThunk<
    GetMovieResponse,
    { search: string; currentPage: number },
    { state: RootState }
>("products/getMovies", async ({ search, currentPage }, { getState }) => {
    const { currentCategory } = getState().posts;

    const categoryAndSearchParams = `q=${search}${
        currentCategory ? `&type=${currentCategory}` : ""
    }`;
    const pagesLimitParams = `?_start=${(currentPage - 1) * 12}&_limit=12`;

    const totalPages = await getTotalPages(
        `${post_api}/movies?${categoryAndSearchParams}`
    );
    const res = await axios.get<IMovie[]>(
        `${post_api}/movies${pagesLimitParams}&${categoryAndSearchParams}`
    );

    return { res: res.data, totalPages };
});

export const getSeries = createAsyncThunk<
    GetSeriesResponse,
    { search: string; currentPage_series: number },
    { state: RootState }
>(
    "products/getSeries",
    async ({ search, currentPage_series }, { getState }) => {
        const { currentCategory } = getState().posts;

        const categoryAndSearchParams = `q=${search}${
            currentCategory ? `&type=${currentCategory}` : ""
        }`;
        const pagesLimitParams = `?_start=${
            (currentPage_series - 1) * 12
        }&_limit=12`;

        const totalPages = await getTotalPages(
            `${post_api}/series?${categoryAndSearchParams}`
        );
        const res = await axios.get<ISeries[]>(
            `${post_api}/series${pagesLimitParams}&${categoryAndSearchParams}`
        );

        return { res: res.data, totalPages };
    }
);
