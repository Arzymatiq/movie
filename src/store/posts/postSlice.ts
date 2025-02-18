import {
    createSlice,
    createEntityAdapter,
    PayloadAction,
} from "@reduxjs/toolkit";
import { IMovie, ISeries, IActors, ISeasonDesc } from "../types/types";
import {
    getActors,
    getMovie,
    getOneMovie,
    getOneSeries,
    getOneSeriesDetails,
    getSeries,
} from "./postAction";

const moviesAdapter = createEntityAdapter<IMovie>();
const seriesAdapter = createEntityAdapter<ISeries>();
const actorsAdapter = createEntityAdapter<IActors>();

interface PostState {
    movies: ReturnType<typeof moviesAdapter.getInitialState>;
    series: ReturnType<typeof seriesAdapter.getInitialState>;
    actorsCast: ReturnType<typeof actorsAdapter.getInitialState>;
    actorsCrew: ReturnType<typeof actorsAdapter.getInitialState>;
    total_pages: number;
    loading: boolean;
    error: string | null;
    oneMovie: IMovie | null;
    oneSeries: ISeries | null;
    oneSeriesDetails: ISeasonDesc | null;
    lastRequestId: string | null;
}

const initialState: PostState = {
    movies: moviesAdapter.getInitialState(),
    series: seriesAdapter.getInitialState(),
    actorsCast: actorsAdapter.getInitialState(),
    actorsCrew: actorsAdapter.getInitialState(),
    total_pages: 1,
    loading: false,
    error: null,
    oneMovie: null,
    oneSeries: null,
    oneSeriesDetails: null,
    lastRequestId: null,
};

const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        // Use the adapter methods to add or remove movies/series/actors
        clearPost: (state) => {
            state.oneMovie = null;
            state.oneSeries = null;
            state.oneSeriesDetails = null;
        },
        clearTotalPages: (state) => {
            state.total_pages = 0;
        },
        setMovies: (state, action: PayloadAction<IMovie[]>) => {
            moviesAdapter.setAll(state.movies, action.payload);
        },
        setSeries: (state, action: PayloadAction<ISeries[]>) => {
            seriesAdapter.setAll(state.series, action.payload);
        },
        setActorsCast: (state, action: PayloadAction<IActors[]>) => {
            actorsAdapter.setAll(state.actorsCast, action.payload);
        },
        setActorsCrew: (state, action: PayloadAction<IActors[]>) => {
            actorsAdapter.setAll(state.actorsCrew, action.payload);
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
                    moviesAdapter.setAll(state.movies, action.payload.results);
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
            .addCase(getSeries.pending, (state, action) => {
                state.loading = true;
                state.lastRequestId = action.meta.requestId;
            })
            .addCase(getSeries.fulfilled, (state, action) => {
                if (state.lastRequestId === action.meta.requestId) {
                    state.error = null;
                    state.loading = false;
                    seriesAdapter.setAll(state.series, action.payload.results);
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
            .addCase(getOneMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOneMovie.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.oneMovie = action.payload.movie;
            })
            .addCase(getOneMovie.rejected, (state) => {
                state.loading = false;
                state.error = "Failed to load movie";
            })
            .addCase(getActors.pending, (state) => {
                state.loading = true;
            })
            .addCase(getActors.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                actorsAdapter.setAll(
                    state.actorsCast,
                    action.payload.actorsCast
                );
                actorsAdapter.setAll(
                    state.actorsCrew,
                    action.payload.actorsCrew
                );
            })
            .addCase(getActors.rejected, (state, action) => {
                state.loading = false;
                state.error = "Failed to load actors";
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
            })
            .addCase(getOneSeriesDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOneSeriesDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                console.log(action.payload);
                state.oneSeriesDetails = action.payload;
            })
            .addCase(getOneSeriesDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = "Failed to load series details";
            });
    },
});

export const {
    clearPost,
    clearTotalPages,
    setMovies,
    setSeries,
    setActorsCast,
    setActorsCrew,
} = postSlice.actions;

export default postSlice.reducer;
