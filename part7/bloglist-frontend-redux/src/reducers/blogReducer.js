import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    likeBlog(state, action) {
      return state.map((blog) =>
        blog.id === action.payload ? { ...blog, likes: blog.likes + 1 } : blog
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

export const giveALike = (blog) => {
  return async (dispatch) => {
    const blogToUpdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    const updatedBlog = await blogService.update(blog.id, blogToUpdate);
    dispatch(likeBlog(updatedBlog.id));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    const response = await blogService.deleteBlog(id);
    if (response.status === 204) dispatch(removeBlog(id));
  };
};

export const { setBlogs, addBlog, likeBlog, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
