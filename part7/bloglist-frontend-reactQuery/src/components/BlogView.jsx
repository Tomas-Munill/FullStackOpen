import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../AppContext';
import { useMutation, useQueryClient } from 'react-query';
import blogService from '../services/blogs';
import { useNavigate } from 'react-router-dom';
import { useField } from '../hooks';
import { Button, ListGroup, Form } from 'react-bootstrap';

const BlogView = ({ blogsQueryResult }) => {
  const id = useParams().id;
  const navigate = useNavigate();
  const { user } = useAppState();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const comment = useField('text');

  const updateBlogMutation = useMutation(blogService.update, {
    onSuccess: (updatedBlog) => {
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

  const commentBlogMutation = useMutation(blogService.createComment, {
    onSuccess: (updatedBlog) => {
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
        navigate('/');
      }
    };
  };

  if (blogsQueryResult.isLoading) {
    return <div>loading data...</div>;
  }

  if (blogsQueryResult.isError) {
    return <div>blog service not available due to problems in server</div>;
  }

  const blogs = blogsQueryResult.data;

  const blog = blogs.find((b) => b.id === id);

  const addComment = (event) => {
    event.preventDefault();
    commentBlogMutation.mutate({ id: blog.id, comment: comment.value });
    comment.reset();
  };

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">{blog.url}</a>
      <br />
      likes {blog.likes}
      <Button onClick={giveALike(blog)} size="sm" className="ms-1">
        like
      </Button>
      <br />
      added by {blog.author}
      {user.userName === blog.user.userName ? (
        <Button
          onClick={removeBlog(blog.id)}
          variant="danger"
          className="ms-1"
          size="sm"
        >
          remove
        </Button>
      ) : (
        ''
      )}
      <h3>comments</h3>
      <Form onSubmit={addComment} className="d-flex">
        <Form.Control {...comment.inputProps} style={{maxWidth: '300px'}} />
        <Button type="submit" className="ms-1">
          add comment
        </Button>
      </Form>
      {blog.comments && blog.comments.length > 0 ? (
        <ListGroup className="mt-3">
          {blog.comments.map((c, index) => (
            <ListGroup.Item key={index}>{c}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <span>No comments</span>
      )}
    </div>
  );
};

export default BlogView;
