import { useState } from 'react';
import PropTypes from 'prop-types';
import Notification from './Notification';
import InputField from './InputField';

const LoginForm = ({ notification, isSuccessful, handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin({
      userName: username,
      password: password,
    });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notification} isSuccessful={isSuccessful} />
      <form onSubmit={handleSubmit}>
        <InputField
          label="username"
          value={username}
          type="text"
          name="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
        <InputField
          label="password"
          value={password}
          type="password"
          name="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
        <button id="btn-login" type="submit">login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired
};

export default LoginForm;