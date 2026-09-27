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
        return Promise.reject(error);
    }
)

export default axiosinterceptor;
