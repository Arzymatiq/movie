import axios, { AxiosError } from "axios";
import { handleError } from "./errorHandler";
import { post_api } from "./consts";

const apiPost = axios.create({
    baseURL: post_api,
    timeout: 10000,
});

apiPost.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;
        const message = handleError(status);
        console.error(message);
        return Promise.reject(error);
    }
);

export default apiPost;
