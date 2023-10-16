import axios from "axios";

const $host = axios.create({
    baseURL: "https://no4-kxb56nabo-yans-projects-f6558538.vercel.app/",
});

const $authHost = axios.create({
    baseURL: "https://no4-kxb56nabo-yans-projects-f6558538.vercel.app/",
});

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    return config;
}

$authHost.interceptors.request.use(authInterceptor);

export {
    $host,
    $authHost
}
