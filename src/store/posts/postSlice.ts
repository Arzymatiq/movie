import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getMovie, getOneMovie, getOneSeries, getSeries } from "./postAction";
import { IMovie, ISeries, IActors } from "../types/types";

interface PostState {
    movies: IMovie[];
    series: ISeries[];
    total_pages: number;
    loading: boolean;
    error: string | null;
    oneMovie: IMovie | null;
    movieActor: IActors[] | null;
    oneSeries: ISeries | null;
    lastRequestId: string | null;
}

const initialState: PostState = {
    movies: [],
    series: [],
    total_pages: 1,
    loading: false,
    error: null,
    oneMovie: null,
    movieActor: [],
    oneSeries: null,
    lastRequestId: null,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        clearPost: (state) => {
            state.oneMovie = null;
            state.oneSeries = null;
        },
        clearTotalPages: (state) => {
            state.total_pages = 0;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMovie.pending, (state, action) => {
                state.loading = true;
                state.lastRequestId = action.meta.requestId;
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                if (state.lastRequestId === action.meta.requestId) {
                    state.error = null;
                    state.loading = false;
                    state.movies = action.payload.results;
                    state.total_pages = action.payload.total_pages;
                }
            })
            .addCase(getMovie.rejected, (state, action) => {
                if (state.lastRequestId === action.meta.requestId) {
                    state.loading = false;
                    state.error =
                        action.error.message || "Failed to load movies";
                }
            })
            .addCase(getOneMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOneMovie.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.oneMovie = action.payload.movie;
                state.movieActor = action.payload.actors;
            })
            .addCase(getOneMovie.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load movie";
            })
            .addCase(getSeries.pending, (state, action) => {
                state.loading = true;
                state.lastRequestId = action.meta.requestId;
            })
            .addCase(getSeries.fulfilled, (state, action) => {
                if (state.lastRequestId === action.meta.requestId) {
                    state.error = null;
                    state.loading = false;
                    state.series = action.payload.results;
                    state.total_pages = action.payload.total_pages;
                }
            })
            .addCase(getSeries.rejected, (state, action) => {
                if (state.lastRequestId === action.meta.requestId) {
                    state.loading = false;
                    state.error =
                        action.error.message || "Failed to load series";
                }
            })
            .addCase(getOneSeries.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOneSeries.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.oneSeries = action.payload;
            })
            .addCase(getOneSeries.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load series";
            });
    },
});

export const { clearPost, clearTotalPages } = postSlice.actions;
export default postSlice.reducer;
