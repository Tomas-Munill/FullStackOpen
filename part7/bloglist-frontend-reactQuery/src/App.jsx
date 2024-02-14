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
import { Button, Navbar, Nav } from 'react-bootstrap';

const App = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppState();

  const blogsQueryResult = useQuery('blogs', blogService.getAll);
  const usersQueryResult = useQuery('users', userService.getAll);

  useEffect(() => {
    checkLoggedIn(dispatch);
  }, []);

  const navLinkStyle = {
    color: 'inherit',
    textDecoration: 'none',
    marginLeft: '1rem'
  };

  const navUserStyle = {
    paddingLeft: '1rem',
    paddingRight: '1rem'
  }

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div className="container">
      <Router>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Toggle className='ms-3' aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#" as="span">
                <Link style={navLinkStyle} to="/">blogs</Link>
              </Nav.Link>
              <Nav.Link href="#" as="span">
                <Link style={navLinkStyle} to="/users">users</Link>
              </Nav.Link>
            </Nav>
            <div className='ms-auto' style={navUserStyle}>
              <Navbar.Text>Signed in as: {user.name}</Navbar.Text>
              <Button
                className="mx-2"
                variant="outline-light"
                onClick={() => logoutUser(dispatch)}
              >
                logout
              </Button>
            </div>
          </Navbar.Collapse>
        </Navbar>

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
    </div>
  );
};

export default App;
