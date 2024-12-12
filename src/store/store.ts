import { combineReducers, configureStore } from "@reduxjs/toolkit";

import userSlice from "./user/userSlice";
import postSlice from "./posts/postSlice";

const rootReducer = combineReducers({
    users: userSlice,
    posts: postSlice,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
    reducer: rootReducer,
});

export default store;
export type AppDispatch = typeof store.dispatch;
