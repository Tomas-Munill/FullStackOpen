import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState(null);
  const [isSuccessful, setIsSuccessful] = useState(null);

  const blogFormRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (credentials) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
    } catch (error) {
      console.error(error);
      setIsSuccessful(false);
      setNotification(error.response.data.error);
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
  };

  const addBlog = async (newBlog) => {
    let blogCreatedSuccessfully;
    try {
      const response = await blogService.create(newBlog);
      setBlogs(blogs.concat(response));
      setIsSuccessful(true);
      setNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`);
      blogCreatedSuccessfully = true;
      setTimeout(() => {
        setNotification(null);
      }, 5000);
      // cerrar el BlogForm
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      console.error(error);
      setIsSuccessful(false);
      setNotification(`error creating a new blog`);
      blogCreatedSuccessfully = false;
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    }
    return blogCreatedSuccessfully;
  };

  const handleLike = async (id, blog) => {
    try {
      await blogService.update(id, blog);
      const updatedBlogs = blogs.map((b) =>
        b.id === id ? { ...b, likes: b.likes + 1 } : b
      );
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemove = async (id) => {
    try {
      const response = await blogService.deleteBlog(id);
      if (response.status === 204) {
        const blogsAfterDeleting = blogs.filter((b) => b.id !== id);
        setBlogs(blogsAfterDeleting);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (user === null) {
    return (
      <LoginForm
        notification={notification}
        isSuccessful={isSuccessful}
        handleLogin={handleLogin}
      />
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={notification} isSuccessful={isSuccessful} />
      <p>{user.name} logged in</p>
      <button
        type="button"
        onClick={() => {
          window.localStorage.removeItem('loggedUser');
          setUser(null);
        }}
      >
        logout
      </button>

      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm id='frm-blog' addBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLike={handleLike}
            handleRemove={handleRemove}
            loggedUsername={user.userName}
          />
        ))}
    </div>
  );
};

export default App;