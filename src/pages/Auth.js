import React, { useContext } from 'react';
import { useState } from 'react';
import { Container, Form } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { NavLink, useNavigate } from 'react-router-dom';
import { login } from '../http/authorizationUserAPI';
import { Context } from "..";
import { observer } from 'mobx-react-lite';
import { UpdateUsers } from '../store/UpdateUsers';

const Auth = observer(() => {
    const navigate = useNavigate();
    const {authorizedUser, users} = useContext(Context);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const signIn = async () => {
        try {
            let user;
            user = await login(email, password);
            authorizedUser.user = user;
            authorizedUser.isAuth = true;
            UpdateUsers(users);
            navigate('/');
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
                <h2 className="m-auto">Log in</h2>
                <Form className="d-flex flex-column">
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
                            Don't have an account?{" "}
                            <NavLink to={"/registration"}>Sign up!</NavLink>
                        </div>
                        <Button className="mt-3" variant={"outline-success"} onClick={signIn}>
                            <div>Log in</div>
                        </Button>
                    </Row>
                </Form>
            </Card>
        </Container>
  );
});

export default Auth;