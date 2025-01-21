import axios from "axios";
import { ACCOUNT_API } from "./consts";
import { Tokens } from "../store/types/types";
import apiPost from "./apiPost";

export const addDataToLocalStorage = (datatoStorage: {
    user: any;
    token: string;
}) => {
    localStorage.setItem("user", JSON.stringify(datatoStorage.user));
    localStorage.setItem("token", datatoStorage.token);
};

export const refreshAccessToken = async () => {
    const tokens: Tokens | null = JSON.parse(
        localStorage.getItem("tokens") || "{}"
    );

    if (!tokens?.refresh) return null;

    try {
        const res = await axios.post(`${ACCOUNT_API}/api/token/refresh/`, {
            refresh: tokens.refresh,
        });

        const newTokens = {
            refresh: tokens.refresh,
            access: res.data.access,
        };

        localStorage.setItem("tokens", JSON.stringify(newTokens));

        apiPost.defaults.headers.common[
            "Authorization"
        ] = `Bearer ${res.data.access}`;

        return res.data.access;
    } catch (error) {
        console.error("Ошибка обновления токена:", error);
        localStorage.removeItem("tokens");
        localStorage.removeItem("user");
        return null;
    }
};

export const updateToken = () => {
    setInterval(async () => {
        const tokens = JSON.parse(localStorage.getItem("tokens") || "{}");
        if (!tokens?.refresh) return;

        try {
            const res = await axios.post(`${ACCOUNT_API}/api/token/refresh/`, {
                refresh: tokens.refresh,
            });

            localStorage.setItem(
                "tokens",
                JSON.stringify({
                    refresh: tokens.refresh,
                    access: res.data.access,
                })
            );
        } catch (error) {
            console.error("Ошибка обновления токена:", error);
        }
    }, 1000 * 60 * 9);
};

export const MaxLength = (title: string, maxSymbols: number): string => {
    if (title.length > maxSymbols) {
        return `${title.slice(0, maxSymbols)}...`;
    }
    return title;
};
