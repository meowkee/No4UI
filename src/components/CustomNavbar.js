import React, { useContext } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import LogoutAuthorizedUser from "../store/LogoutAuthorizedUser";

const CustomNavbar = observer(() => {
    const { authorizedUser } = useContext(Context);

    const logout = () => {
        LogoutAuthorizedUser(authorizedUser);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <NavLink to="/" style={{ color: "white", fontSize: "20px" }}>
                    Main page
                </NavLink>
                {authorizedUser.isAuth ? (
                    <Nav className="ms-auto ml-2" style={{ color: "white" }}>
                        <span className="mt-2 me-2">
                            Hello {authorizedUser.user.name}!
                        </span>
                        <Button variant="outline-light" className="ms-2" onClick={logout}>
                            Log out
                        </Button>
                    </Nav>
                ) : (
                    <Nav className="ms-auto ml-2" style={{ color: "white" }}>
                        <NavLink to={"/auth"}>
                            <Button variant="outline-light">Log In</Button>
                        </NavLink>
                        <NavLink to={"/registration"}>
                            <Button
                                variant="outline-light"
                                className="ms-2"
                                href="/registration"
                            >
                                Sign Up
                            </Button>
                        </NavLink>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default CustomNavbar;
