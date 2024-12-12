import axios from "axios";
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
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage =
            error.response?.data?.message || "Something went wrong";
        console.error("API Error:", errorMessage);
        console.log(error);

        return Promise.reject(errorMessage);
    }
);

export default axiosInstance;
