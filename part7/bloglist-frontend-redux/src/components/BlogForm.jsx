import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import {
  setSuccessfulMessage,
  setErrorMessage,
  clearMessage,
} from '../reducers/notificationReducer';
import { useField } from '../hooks';

const BlogForm = ({ toggleVisibility }) => {
  const dispatch = useDispatch();

  const title = useField('text');
  const author = useField('text');
  const url = useField('text');

  const addBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value,
      };
      dispatch(createBlog(newBlog));
      // notificar creación exitosa
      dispatch(
        setSuccessfulMessage(
          `a new blog ${newBlog.title} by ${newBlog.author} added`
        )
      );
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
      // cerrar el formulario
      toggleVisibility();
      // limpiar elementos input
      title.reset();
      author.reset();
      url.reset();
    } catch (error) {
      console.error(error);
      dispatch(setErrorMessage('error creating a new blog'));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
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

export default BlogForm;
