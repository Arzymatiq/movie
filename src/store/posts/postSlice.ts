import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { getMovie, getOneMovie, getOneSeries, getSeries } from "./postAction";
import { IMovie, ISeries } from "../types/types";

interface ProductState {
    movies: IMovie[];
    oneMovie: IMovie | null;

    series: ISeries[];
    oneSeries: ISeries | null;

    currentPage: number;
    totalPages: number;
    itemsPerPage: number;
    currentPage_series: number;
    totalPages_series: number;
    currentCategory: string | null;
    search: string;
    loading: boolean;
    error: string;
}

const initialState: ProductState = {
    movies: [],
    oneMovie: null,

    series: [],
    oneSeries: null,

    currentPage: 1,
    totalPages: 0,
    itemsPerPage: 12,
    currentPage_series: 1,
    totalPages_series: 0,
    currentCategory: null,
    search: "",
    loading: false,
    error: "",
};

const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        changePage: (state, action) => {
            state.currentPage = action.payload.page;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setCategory: (state, action) => {
            state.currentCategory = action.payload;
        },
        setItemsPerPage: (state, action) => {
            state.itemsPerPage = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMovie.fulfilled, (state, action) => {
                state.movies = action.payload.res;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(getMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка загрузки данных";
            })
            .addCase(getSeries.pending, (state) => {
                state.loading = true;
            })
            .addCase(getSeries.fulfilled, (state, action) => {
                state.series = action.payload.res;
                state.totalPages_series = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(getSeries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Ошибка загрузки данных";
            })
            .addCase(getOneMovie.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getOneMovie.fulfilled,
                (state, action: PayloadAction<IMovie>) => {
                    state.loading = false;
                    state.oneMovie = action.payload;
                }
            )
            .addCase(getOneMovie.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(getOneSeries.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                getOneSeries.fulfilled,
                (state, action: PayloadAction<ISeries>) => {
                    state.loading = false;
                    state.oneSeries = action.payload;
                }
            )
            .addCase(getOneSeries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { changePage, setSearch, setCategory, setItemsPerPage } =
    productsSlice.actions;
export default productsSlice.reducer;
