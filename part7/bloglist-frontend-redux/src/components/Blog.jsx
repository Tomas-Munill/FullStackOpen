import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { giveALike, deleteBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();

  const loggedUsername = useSelector((state) => state.user.userName);

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

  const handleRemove = (id) => {
    return () => {
      if (window.confirm('Estás seguro que queres eliminar este blog?'))
        dispatch(deleteBlog(id));
    };
  };

  return (
    <div style={blogStyle}>
      <div className="visiblePorDefecto" style={hideWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={buttonStyle}>
          view
        </button>
      </div>
      <div className="detalles" style={showWhenVisible}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility} style={buttonStyle}>
          hide
        </button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button
          onClick={async () => dispatch(giveALike(blog))}
          style={buttonStyle}
        >
          like
        </button>
        <br />
        {blog.user && blog.user.name ? blog.user.name : 'user not found'}
        <br />
        {loggedUsername === blog.user.userName ? (
          <button
            onClick={handleRemove(blog.id)}
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
};

export default Blog;
