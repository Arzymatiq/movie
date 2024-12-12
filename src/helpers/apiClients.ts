import axios from "axios";
import { ACCOUNT_API } from "./consts";
import { refreshAccessToken } from "./function";

export interface Tokens {
    access: string;
    refresh: string;
}
const apiClient = axios.create({
    baseURL: ACCOUNT_API,
    headers: {
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const tokens: Tokens | null = JSON.parse(
            localStorage.getItem("tokens") || "{}"
        );

        console.log(tokens);

        if (tokens?.access) {
            config.headers["Authorization"] = `Bearer ${tokens.access}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue: any[] = [];

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

        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers[
                        "Authorization"
                    ] = `Bearer ${token}`;
                    return apiClient.request(originalRequest);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            const newAccessToken = await refreshAccessToken();

            if (newAccessToken) {
                processQueue(null, newAccessToken);
                originalRequest.headers[
                    "Authorization"
                ] = `Bearer ${newAccessToken}`;
                return apiClient.request(originalRequest);
            } else {
                processQueue(error, null);
                return Promise.reject(error);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
