import React from 'react';
import Notification from './Notification';
import { useField } from '../hooks';
import { loginUser } from '../reducers/userReducer';
import { useAppDispatch } from '../AppContext';

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
