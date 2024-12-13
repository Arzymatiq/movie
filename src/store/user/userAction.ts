import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "./axiosInstance";
export const register = createAsyncThunk(
    "user/register",
    async (
        registerData: {
            login: string;
            password: string;
            fullName: string;
            roleId: number;
        },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post(
                "/api/auth/register",
                registerData
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error);
        }
    }
);

export const loginFunc = createAsyncThunk(
    "user/loginFunc",
    async (
        loginData: { login: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await axiosInstance.post(
                "/api/auth/login",
                loginData
            );
            console.log("Login API response:", response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);
