import axios from 'axios';

const axiosinterceptor = axios.create({
    baseURL: "http://localhost:5454",
    timeout: 3600,
    headers: {
        content: "application/json"
    }
})

axiosinterceptor.interceptors.request.use(
    (config) => {
        console.log("Request : ", config);
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

axiosinterceptor.interceptors.response.use(
    (response) => {
        console.log("Respones: ", response)
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");

            if (window.location.pathname !== "/login") {
                window.location.replace("/login");
            }
        }
        return Promise.reject(error);
    }
)

export default axiosinterceptor;
