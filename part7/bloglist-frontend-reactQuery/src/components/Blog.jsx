import React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useAppDispatch, useAppState } from '../AppContext';

const Blog = ({ blog }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppState();

  const queryClient = useQueryClient();

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
      // actualizar el estado de la consulta para optimizar el rendimiento
      const blogs = queryClient.getQueryData('blogs');
      const updatedBlogs = blogs.map((b) =>
        b.id === updatedBlog.id ? updatedBlog : b
      );
      queryClient.setQueryData('blogs', updatedBlogs);
    },
    onError: () => {
      if (error.response && error.response.data && error.response.data.error) {
        showAndClearNotification(error.response.data.error, false, dispatch);
      } else {
        showAndClearNotification(
          'An unexpected error occurred',
          false,
          dispatch
        );
      }
    },
  });

  const deleteBlogMutation = useMutation(blogService.deleteBlog, {
    onSuccess: (deletedBlogId) => {
      // actualizar el estado de la consulta para optimizar el rendimiento
      const blogs = queryClient.getQueryData('blogs');
      const blogsAfterDeleting = blogs.filter((b) => b.id !== deletedBlogId);
      queryClient.setQueryData('blogs', blogsAfterDeleting);
    },
    onError: () => {
      if (error.response && error.response.data && error.response.data.error) {
        showAndClearNotification(error.response.data.error, false, dispatch);
      } else {
        showAndClearNotification(
          'An unexpected error occurred',
          false,
          dispatch
        );
      }
    },
  });

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
        id: blog.id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id,
      };
      updateBlogMutation.mutate(blogToUpdate);
    };
  };

  const removeBlog = (id) => {
    return () => {
      if (window.confirm('Estás seguro que queres eliminar este blog?')) {
        deleteBlogMutation.mutate(id);
      }
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
        <button onClick={giveALike(blog)} style={buttonStyle}>
          like
        </button>
        <br />
        {blog.user && blog.user.name ? blog.user.name : 'user not found'}
        <br />
        {user.userName === blog.user.userName ? (
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
};

export default Blog;
