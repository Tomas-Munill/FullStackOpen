import { useState } from 'react';
import PropTypes from 'prop-types';
import InputField from './InputField';

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    let blogCreatedSuccessfully = await addBlog({
      title: title,
      author: author,
      url: url,
    });
    if (blogCreatedSuccessfully) {
      setTitle('');
      setAuthor('');
      setUrl('');
    }
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <InputField
          label="title"
          value={title}
          type="text"
          name="Title"
          onChange={(event) => setTitle(event.target.value)}
        />
        <InputField
          label="author"
          value={author}
          type="text"
          name="Author"
          onChange={(event) => setAuthor(event.target.value)}
        />
        <InputField
          label="url"
          value={url}
          type="text"
          name="Url"
          onChange={(event) => setUrl(event.target.value)}
        />
        <button type="submit">create</button>
      </form>
    </>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
};

export default BlogForm;