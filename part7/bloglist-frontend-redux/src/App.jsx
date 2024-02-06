import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogReducer';
import { checkLoggedIn, logOut } from './reducers/userReducer';
import Blogs from './components/Blogs';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogFormRef = useRef();

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkLoggedIn());
  }, [dispatch]);

  if (user === null) {
    return <LoginForm />;
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button
        type="button"
        onClick={() => {
          dispatch(logOut());
        }}
      >
        logout
      </button>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          id="frm-blog"
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <Blogs />
    </div>
  );
};

export default App;
