import { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, handleLike, handleRemove, loggedUsername }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const buttonStyle = {
    marginLeft: 5,
  };

  const giveALike = (blog) => {
    return () => {
      const blogToUpdate = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      };

      const id = blog.id;

      handleLike(id, blogToUpdate);
    };
  };

  const removeBlog = (id) => {
    return () => {
      if (window.confirm('Estás seguro que queres eliminar este blog?'))
        handleRemove(id);
    };
  };

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={buttonStyle}>
          view
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={buttonStyle}>
          hide
        </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={giveALike(blog)} style={buttonStyle}>
          like
        </button>
        <br />
        {blog.user && blog.user.name ? blog.user.name : 'user not found'}
        <br />
        {loggedUsername === blog.user.userName ? (
          <button
            onClick={removeBlog(blog.id)}
            style={{ ...buttonStyle, backgroundColor: 'royalblue' }}
          >
            remove
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  handleRemove: PropTypes.func.isRequired,
  loggedUsername: PropTypes.string.isRequired
};

export default Blog;