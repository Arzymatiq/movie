import { createSlice } from "@reduxjs/toolkit";
import { loginFunc, registerFunc } from "./userAction";
import { IUser } from "../types/types";
import { addDataToLocalStorage, updateToken } from "../../helpers/function";

interface AuthState {
    user: IUser | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
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
        setUser: (state, action) => {
            state.user = action.payload;
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
            .addCase(registerFunc.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerFunc.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(registerFunc.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            });
    },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
