import React from 'react';
import Notification from './Notification';
import { useField } from '../hooks';
import { loginUser } from '../reducers/userReducer';
import { useAppDispatch } from '../AppContext';
import { Form, Button } from 'react-bootstrap';

const LoginForm = () => {
  const dispatch = useAppDispatch();

  const username = useField('text');
  const password = useField('password');

  const handleLogin = (event) => {
    event.preventDefault();
    const credentials = {
      userName: username.value,
      password: password.value,
    };
    loginUser(credentials, dispatch);
    username.reset();
    password.reset();
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center flex-column"
      style={{ minHeight: '100vh' }}
    >
      <h2>Log in to blog application</h2>
      <Notification />
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Label>username:</Form.Label>
          <Form.Control
            {...username.inputProps}
            maxLength={20}
            style={{ maxWidth: '300px', minWidth: '250px' }}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>password:</Form.Label>
          <Form.Control
            {...password.inputProps}
            maxLength={20}
            style={{ maxWidth: '300px' }}
          />
        </Form.Group>
        <div className="d-grid">
          <Button id="btn-login" type="submit">
            login
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;
