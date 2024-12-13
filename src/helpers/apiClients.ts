import axios from "axios";
import { ACCOUNT_API } from "./consts";
import { refreshAccessToken } from "./function";
import { Tokens } from "../store/types/types";

const apiClient = axios.create({
    baseURL: ACCOUNT_API,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        try {
            const tokens: Tokens | null = JSON.parse(
                localStorage.getItem("tokens") || "null"
            );
            if (tokens?.access) {
                config.headers["Authorization"] = `Bearer ${tokens.access}`;
            }
        } catch (err) {
            console.error("Ошибка чтения токенов из localStorage:", err);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: {
    resolve: (token: string) => void;
    reject: (error: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null = null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error);
        }
    });
    failedQueue = [];
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._isRetry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.headers[
                            "Authorization"
                        ] = `Bearer ${token}`;
                        return apiClient.request(originalRequest);
                    })
                    .catch((err) => Promise.reject(err));
            }

            originalRequest._isRetry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();
                if (newAccessToken) {
                    processQueue(null, newAccessToken);

                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return apiClient.request(originalRequest);
                } else {
                    processQueue(error, null);
                    throw error;
                }
            } catch (err) {
                processQueue(err, null);
                throw err;
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
