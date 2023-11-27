import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        "Content-Type": "application/json"
    },
});

http.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    },
);

http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const {status} = error.response;
        if (status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location = "/auth/login";
        }
        return Promise.reject(error);
    },
);


export default http;