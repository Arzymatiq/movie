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

apiClient.interceptors.request.use((config) => {
    const tokens: Tokens | null = JSON.parse(
        localStorage.getItem("tokens") || "null"
    );
    if (tokens?.access) {
        config.headers["Authorization"] = `Bearer ${tokens.access}`;
    }
    return config;
}, Promise.reject);

let isRefreshing = false;
type QueueCallback = (token: string | Error) => void;
const queue: QueueCallback[] = [];

const handleQueue = (tokenOrError: string | Error) => {
    queue.forEach((cb) => cb(tokenOrError));
    queue.length = 0;
};

apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response, config } = error;

        if (response?.status === 401 && !config._isRetry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    queue.push((tokenOrError) => {
                        if (tokenOrError instanceof Error) {
                            reject(tokenOrError);
                        } else {
                            config.headers[
                                "Authorization"
                            ] = `Bearer ${tokenOrError}`;
                            resolve(apiClient.request(config));
                        }
                    });
                });
            }

            config._isRetry = true;
            isRefreshing = true;

            try {
                const newAccessToken = await refreshAccessToken();
                handleQueue(newAccessToken);

                if (newAccessToken) {
                    config.headers[
                        "Authorization"
                    ] = `Bearer ${newAccessToken}`;
                    return apiClient.request(config);
                }
            } catch (err) {
                handleQueue(err as Error);
                throw err;
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
