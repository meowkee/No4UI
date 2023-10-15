import { $host } from "./index";

export const fetchUsers = async () => {
    const { data } = await $host.get("/api/users");
    return data;
};

export const deleteUser = async (email) => {
    const { data } = await $host.delete("/api/users", {
        data: {
            email: email,
        },
    });
    return data;
};

export const updateUserStatus = async (email, changeOn) => {
    const { data } = await $host.put("/api/users/changestatus", {
        email,
        changeOn,
    });
    return data;
};
