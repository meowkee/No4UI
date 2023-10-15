import { fetchUsers } from "../http/usersAPI";

export const UpdateUsers = async (usersContext) => {
    const receivedUsers = await fetchUsers();
    usersContext.users = receivedUsers;
};
