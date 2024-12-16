import { createSlice } from "@reduxjs/toolkit";
import { getMovie, getSeries } from "./postAction";
import { IMovie, ISeries } from "../types/types";

interface ProductState {
    movies: IMovie[];
    series: ISeries[];
    currentPage: number;
    totalPages: number;
    currentPage_series: number;
    totalPages_series: number;
    currentCategory: string | null; // Для фильтрации
    search: string;
    loading: boolean;
    error: string;
}

const initialState: ProductState = {
    movies: [],
    series: [],
    currentPage: 1,
    totalPages: 0,

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
            });
    },
});

export const { changePage, setSearch, setCategory } = productsSlice.actions;
export default productsSlice.reducer;
