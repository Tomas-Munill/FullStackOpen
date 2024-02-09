import { useEffect } from 'react';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Users from './components/Users';
import User from './components/User';
import { useAppDispatch, useAppState } from './AppContext';
import { checkLoggedIn, logoutUser } from './reducers/userReducer';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import blogService from './services/blogs';
import userService from './services/users';
import BlogView from './components/BlogView';

const App = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppState();

  const blogsQueryResult = useQuery('blogs', blogService.getAll);
  const usersQueryResult = useQuery('users', userService.getAll);

  useEffect(() => {
    checkLoggedIn(dispatch);
  }, []);

  const navStyle = {
    listStyleType: 'none',
    padding: 0,
  };
  
  const liStyle = {
    display: 'inline',
    marginRight: '10px',
  };

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <Router>
      <nav>
        <ul style={navStyle}>
          <li style={liStyle}><Link to='/'>blogs</Link></li>
          <li style={liStyle}><Link to='/users'>users</Link></li>
          <li style={liStyle}>
            <span>{user.name} logged in</span>
            <button type="button" onClick={() => logoutUser(dispatch)}>
              logout
            </button>
          </li>
        </ul>
      </nav>
      <h1>blog app</h1>
      <Notification />

      <Routes>
        <Route
          path="/"
          element={<Home blogsQueryResult={blogsQueryResult} />}
        />
        <Route
          path="/users"
          element={<Users usersQueryResult={usersQueryResult} />}
        />
        <Route
          path="/users/:id"
          element={<User usersQueryResult={usersQueryResult} />}
        />
        <Route
          path="/blogs/:id"
          element={<BlogView blogsQueryResult={blogsQueryResult} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
