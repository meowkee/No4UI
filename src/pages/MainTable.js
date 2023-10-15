import React, { useContext, useState } from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import blockIcon from "../padlock.png";
import unblockIcon from "../unlock.png";
import deleteIcon from "../delete.png";
import { Container } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { deleteUser, updateUserStatus } from "../http/usersAPI";
import { UpdateUsers } from "../store/UpdateUsers";
import LogoutAuthorizedUser from "../store/LogoutAuthorizedUser";

const MainTable = observer(() => {
    const { authorizedUser, users } = useContext(Context);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [selectAll, setSelectAll] = useState(false);

    const toggleSelectAll = () => {
        setSelectAll(!selectAll);
        if (!selectAll) {
            setSelectedUsers(users.users.map((user) => user.email));
        } else {
            setSelectedUsers([]);
        }
    };

    const handleUserCheckboxChange = (selectedEmail) => {
        if (selectedUsers.includes(selectedEmail)) {
            setSelectedUsers(
                selectedUsers.filter((email) => email !== selectedEmail)
            );
        } else {
            setSelectedUsers([...selectedUsers, selectedEmail]);
        }
    };

    const handleUpdateTable = (usersArray) => {
        if (usersArray.every((user) => user)) {
            UpdateUsers(users);
        }
    };

    const handleBlockAndUnblock = async (changeOn) => {
        const usersArray = await Promise.all(
            selectedUsers.map((user) => updateUserStatus(user, changeOn))
        );
        handleUpdateTable(usersArray);
    };

    const handleAuthorizedUserLogout = () => {
    if (selectedUsers.includes(authorizedUser.user.email)) {
        LogoutAuthorizedUser(authorizedUser);
    }
}

    const handleBlock = async () => {
        const changeOn = "Blocked";
        handleBlockAndUnblock(changeOn);
        handleAuthorizedUserLogout();
    };

    const handleUnblock = async () => {
        const changeOn = "Active";
        handleBlockAndUnblock(changeOn);
    };

    const handleDelete = async () => {
        const deletedUsers = await Promise.all(
            selectedUsers.map((user) => deleteUser(user))
        );
        handleAuthorizedUserLogout();
        handleUpdateTable(deletedUsers);
    };

    return (
        <Container>
            <div>
                <div className="mt-4 mb-2">
                    <Button
                        variant="danger"
                        onClick={handleDelete}
                        className="me-2"
                    >
                        <img
                            src={deleteIcon}
                            alt="Delete"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </Button>
                    <Button
                        variant="warning"
                        onClick={handleUnblock}
                        className="me-2"
                    >
                        <img
                            src={unblockIcon}
                            alt="Unblock"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </Button>
                    <Button variant="info" onClick={handleBlock}>
                        <img
                            src={blockIcon}
                            alt="Block"
                            style={{ width: "20px", height: "20px" }}
                        />
                    </Button>
                </div>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>
                                <Form.Check
                                    type="checkbox"
                                    label=""
                                    checked={selectAll}
                                    onChange={toggleSelectAll}
                                />
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Date of sign up</th>
                            <th>Date of last login</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.users.map((user) => (
                            <tr key={user.email}>
                                <td>
                                    <Form.Check
                                        type="checkbox"
                                        label=""
                                        checked={selectedUsers.includes(
                                            user.email
                                        )}
                                        onChange={() =>
                                            handleUserCheckboxChange(user.email)
                                        }
                                    />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.signUpDate
                                            .replace("T", " ")
                                            .split(".")[0]
                                    }
                                </td>
                                <td>
                                    {user.lastSignInDate === null
                                        ? " "
                                        : user.lastSignInDate
                                              .replace("T", " ")
                                              .split(".")[0]}
                                </td>
                                <td>{user.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
});

export default MainTable;
