import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useAppDispatch } from '../AppContext';
import { showAndClearNotification } from '../reducers/notificationReducer';

const BlogForm = ({ toggleVisibility }) => {
  const queryClient = useQueryClient();
  const newBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs');
      queryClient.setQueryData('blogs', blogs.concat(newBlog));

      showAndClearNotification(
        `a new blog ${title.value} by ${author.value} added`,
        true,
        dispatch
      );
      title.reset();
      author.reset();
      url.reset();

      toggleVisibility(); // cerrar el form
    },
    onError: (error) => {
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

  const dispatch = useAppDispatch();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const addBlog = async (event) => {
    event.preventDefault();
    newBlogMutation.mutate({
      title: title.value,
      author: author.value,
      url: url.value,
    });
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input {...title.inputProps} id="title" />
        </div>
        <div>
          author: <input {...author.inputProps} id="author" />
        </div>
        <div>
          url: <input {...url.inputProps} id="url" />
        </div>
        <button id="btn-create" type="submit">
          create
        </button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
