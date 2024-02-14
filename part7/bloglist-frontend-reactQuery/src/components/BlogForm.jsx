import React from 'react';
import PropTypes from 'prop-types';
import { useField } from '../hooks';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useAppDispatch } from '../AppContext';
import { showAndClearNotification } from '../reducers/notificationReducer';
import { Form, Button, Card } from 'react-bootstrap';

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
    <Card>
      <Card.Header as="h3">create new</Card.Header>
      <Card.Body>
        <Form onSubmit={addBlog}>
          <Form.Group className="mb-3">
            <Form.Label>title:</Form.Label>
            <Form.Control {...title.inputProps} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>author:</Form.Label>
            <Form.Control {...author.inputProps} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>url:</Form.Label>
            <Form.Control {...url.inputProps} />
          </Form.Group>
          <Button
            size="lg"
            variant="primary"
            id="btn-create"
            type="submit"
          >
            create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

BlogForm.propTypes = {
  toggleVisibility: PropTypes.func.isRequired,
};

export default BlogForm;
