import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { authenticateAction } from '../redux/actions/authenticateAction';
const Login = ({ setAuthenticate, to }) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  console.log("tototo", to);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = (event) => {
    event.preventDefault();
    
    dispatch(authenticateAction.login(id, password)) // id password값 보내줌
    navigate("/");
  };
  return (
    <Container className="login-area">
      <Form className="login-form" onSubmit={login}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={(event) => setId(event.target.value) } />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={(event) => setPassword(event.target.value)} />
        </Form.Group>

        <Button variant="danger" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
