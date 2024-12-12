import { createSlice } from "@reduxjs/toolkit";
import { loginFunc, register } from "./userAction";
import { IUser } from "../types/types";
import { addDataToLocalStorage, updateToken } from "../../helpers/function";

interface AuthState {
    user: IUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("user");
            localStorage.removeItem("token");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginFunc.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginFunc.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(loginFunc.fulfilled, (state, action) => {
                state.loading = false;

                const accessToken = action.payload?.accessToken;
                const refreshToken = action.payload?.refreshToken;
                const user = action.payload?.user;

                if (accessToken && refreshToken && user) {
                    state.token = accessToken;
                    state.user = user;

                    addDataToLocalStorage({
                        token: accessToken,
                        user,
                    });

                    updateToken();
                } else {
                    state.error =
                        "Invalid response: accessToken, refreshToken, or user is missing";
                    console.error("Unexpected response:", action.payload);
                }
            })

            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
