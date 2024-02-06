import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (id, blog) => {
  try {
    const response = await axios.put(`${baseUrl}/${id}`, blog);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export default { setToken, getAll, create, update, deleteBlog };
