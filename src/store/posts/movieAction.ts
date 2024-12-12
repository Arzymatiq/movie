import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { post_api } from "../../helpers/consts";

export const getMovie = createAsyncThunk("post/getMovie", async () => {
    const res = await axios.get(`${post_api}/movies`);
    return res.data;
});
export const getSeries = createAsyncThunk("post/getSeries   ", async () => {
    const res = await axios.get(`${post_api}/series`);
    return res.data;
});
