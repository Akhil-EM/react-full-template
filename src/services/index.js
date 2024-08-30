import axios from 'axios';
import { API_BASE_URL } from '../config';

// ------------------------------------
const AxiosInstance = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
});

//interceptors
AxiosInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

let retryCount = 0;
const refreshAccessToken = async () => {
    try {
        
    } catch (error) {

    }
};

AxiosInstance.interceptors.response.use(
    response => response,
    error => {
        const { config, response: { status } } = error;
        console.log(config);
        
        if (status === 401) {
            // if(retryCount <= 2 ){
            //     retryCount += 1;
            //     return AxiosInstance(config);
            // }
            // Retry count logic to prevent infinite loops
            config.__retryCount = config.__retryCount || 0;
            if (config.__retryCount >= 1) {
                return Promise.reject(error);
            }
            config.__retryCount += 1;

            try {
                // Handle token refresh here, if applicable
                // Example: const newToken = await refreshToken();
                // localStorage.setItem("accessToken", newToken);

                // Retry the original request
                return AxiosInstance(config);
            } catch (refreshError) {
                // Handle errors during token refresh
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default AxiosInstance;