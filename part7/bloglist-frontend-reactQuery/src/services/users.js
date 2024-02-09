import axios from 'axios';
const baseUrl = 'http://localhost:3003/api/users';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error('Error al recuperar usuarios: ', error);
    throw error;
  }
};

export default { getAll };
