import React from 'react';
import Notification from './Notification';
import { useDispatch } from 'react-redux';
import { logIn } from '../reducers/userReducer';
import { useField } from '../hooks';

const LoginForm = () => {
  const dispatch = useDispatch();

  const username = useField('text');
  const password = useField('password');

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = {
      userName: username.value,
      password: password.value,
    };
    dispatch(logIn(credentials));
    username.reset();
    password.reset();
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification />
      <form onSubmit={handleLogin}>
        <div>
          username: <input {...username.inputProps} id="username" />
        </div>
        <div>
          password: <input {...password.inputProps} id="password" />
        </div>
        <button id="btn-login" type="submit">
          login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
