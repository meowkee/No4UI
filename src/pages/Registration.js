import React from "react";
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registration } from "../http/authorizationUserAPI";

const Registration = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const signUp = async () => {
        try {
            await registration(name, email, password);  
            alert(`Account ${email} created successfully`);
            navigate('/auth');
        }
        catch (e) {
            alert(e.response.data.message);
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 100 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">Sign up</h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder="Enter your password"
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
                        <div>
                            Have an account?{" "}
                            <NavLink to={"/auth"}>Log in!</NavLink>
                        </div>
                        <Button className="mt-3" variant={"outline-success"} onClick={signUp}>
                            <div>Sign up</div>
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
    );
};

export default Registration;
