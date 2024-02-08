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
    console.error('Error al recuperar blogs: ', error);
    throw error;
  }
};

const create = async (blog) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    const response = await axios.post(baseUrl, blog, config);
    return response.data;
  } catch (error) {
    console.error('Error al insertar un blog:', error);
    throw error;
  }
};

const update = async (blog) => {
  try {
    const response = await axios.put(`${baseUrl}/${blog.id}`, blog);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar un blog:', error);
    throw error;
  }
};

const deleteBlog = async (id) => {
  try {
    const config = {
      headers: { Authorization: token },
    };
    await axios.delete(`${baseUrl}/${id}`, config);
    return id;
  } catch (error) {
    console.error('Error al eliminar un blog:', error);
    throw error;
  }
};

export default { setToken, getAll, create, update, deleteBlog };
