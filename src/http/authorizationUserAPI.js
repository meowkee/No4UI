import { $authHost, $host } from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password) => {
    const { data } = await $host.post("api/user/registration", {
        name,
        email,
        password,
    });
    return jwt_decode(data.token);
};

export const login = async (email, password) => {
    const { data } = await $host.post("api/user/login", {
        email,
        password,
    });
    return jwt_decode(data.token);
};

export const checkAuthorization = async () => {
    const {data} = await $authHost.get("api/user/auth");
    return jwt_decode(data.token);
};
