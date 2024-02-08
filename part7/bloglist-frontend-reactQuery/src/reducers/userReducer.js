import loginService from '../services/login';
import blogService from '../services/blogs';
import { showAndClearNotification } from './notificationReducer';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'CLEAR_USER':
      return null;
    default:
      return state;
  }
};

export const loginUser = async (credentials, dispatch) => {
  try {
    const user = await loginService.login(credentials);
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    dispatch({ type: 'SET_USER', payload: user });
    blogService.setToken(user.token);
  } catch (error) {
    console.error('Error al iniciar sesión: ', error);
    showAndClearNotification(error.response.data.error, false, dispatch)
  }
};

export const logoutUser = (dispatch) => {
  window.localStorage.removeItem('loggedUser');
  blogService.setToken('');
  dispatch({ type: 'CLEAR_USER' });
};

export const checkLoggedIn = (dispatch) => {
  const loggedUser = window.localStorage.getItem('loggedUser');
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    dispatch({ type: 'SET_USER', payload: user });
    blogService.setToken(user.token);
  }
};

export default userReducer;
