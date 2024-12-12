import { createSlice } from "@reduxjs/toolkit";
import { IMovie, ISeries } from "../types/types";
import { getMovie, getSeries } from "./movieAction";

interface IMoviesState {
    movies: IMovie[];
    series: ISeries[];
    loading: boolean;
    error: string | null;
}

const initialState: IMoviesState = {
    movies: [],
    series: [],
    loading: false,
    error: null,
};

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovie.pending && getSeries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                getMovie.rejected && getSeries.rejected,
                (state, action) => {
                    state.loading = false;
                    state.error =
                        action.error.message || "Ошибка загрузки данных";
                }
            )
            .addCase(getMovie.fulfilled, (state, action) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(getSeries.fulfilled, (state, action) => {
                state.loading = false;
                state.series = action.payload;
                console.log(action);
            });
    },
});

export default movieSlice.reducer;
