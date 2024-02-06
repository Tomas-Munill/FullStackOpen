import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import blogService from '../services/blogs';
import { setErrorMessage, clearMessage } from './notificationReducer';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    clearUser(state, action) {
      return null;
    },
    checkLoggedIn(state, action) {
      const loggedUser = window.localStorage.getItem('loggedUser');
      if (loggedUser) {
        const user = JSON.parse(loggedUser);
        blogService.setToken(user.token);
        return user;
      }
      return null;
    },
  },
});

export const logIn = (credentials) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(credentials);
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      dispatch(setUser(user));
    } catch (error) {
      console.error(error);
      dispatch(setErrorMessage(error.response.data.error));
      setTimeout(() => {
        dispatch(clearMessage());
      }, 5000);
    }
  };
};

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedUser');
    blogService.setToken('');
    dispatch(clearUser());
  };
};

export const { setUser, clearUser, checkLoggedIn } = userSlice.actions;
export default userSlice.reducer;
