import axios from 'axios'
const axios_instance = axios.create({
    headers: {
        'Content-Type': 'application/json',
    },
});

axios_instance.interceptors.request.use(
    function (config) {
        // Do something before request is sent
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    }
);

axios_instance.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        const originalConfig = error.config;
        if (
            error.response &&
            error.response.status === 401 &&
            !originalConfig.retry
        ) {
            originalConfig.retry = true;
            if (originalConfig.url == '/api/inventory/login') {
                return Promise.reject(error);
            }

            axios_instance.post('/api/inventory/retry', { refresh: "" })
                .then((res) => {
                    return axios_instance(originalConfig);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
        } else if (error.response && error.response.status === 422) {
            window.location.href = '/login';
        } else {
            return Promise.reject(error);
        }
    }
);

export default axios_instance;