import axios, { AxiosError } from "axios";
import { ACCOUNT_API } from "../../helpers/consts";

const axiosInstance = axios.create({
    baseURL: ACCOUNT_API,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        console.log(config);

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error: AxiosError) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        if (response.status >= 200 && response.status < 300) {
            console.log("API Request successful:", response);
        }
        return response;
    },
    (error) => {
        const status = error.response?.status;

        if (status >= 400 && status < 500) {
            const errorMessage =
                error.response?.data?.message || "Client Error";
            console.error("Client Error: ", errorMessage);
        } else if (status >= 500 && status < 600) {
            const errorMessage =
                error.response?.data?.message || "Server Error";
            console.error("Server Error: ", errorMessage);
        } else if (!status) {
            console.error("Network Error or No Response", error);
        }

        const errorMessage =
            error.response?.data?.message || "Something went wrong";
        return Promise.reject(errorMessage);
    }
);

export default axiosInstance;
