import { useEffect, useRef } from 'react';
import Blogs from './components/Blogs';
import Notification from './components/Notification';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { useAppDispatch, useAppState } from './AppContext';
import { useQuery } from 'react-query';
import { checkLoggedIn, logoutUser } from './reducers/userReducer';

const App = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppState();

  const blogFormRef = useRef();

  const blogsQueryResult = useQuery('blogs', blogService.getAll);

  useEffect(() => {
    checkLoggedIn(dispatch);
  }, []);

  if (user === null) {
    return <LoginForm />;
  }

  if (blogsQueryResult.isLoading) {
    return <div>loading data...</div>;
  }

  if (blogsQueryResult.isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = blogsQueryResult.data;

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <button type="button" onClick={() => logoutUser(dispatch)}>
        logout
      </button>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          id="frm-blog"
          toggleVisibility={() => blogFormRef.current.toggleVisibility()}
        />
      </Togglable>

      <Blogs blogs={blogs} loggedUsername={user.userName} />
    </div>
  );
};

export default App;
