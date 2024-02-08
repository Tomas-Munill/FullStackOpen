import notificationReducer from './notificationReducer';
import userReducer from './userReducer';

export const initialState = {
  notification: {
    message: '',
    isSuccessful: false,
  },
  user: null
};

export const rootReducer = (state, action) => ({
  notification: notificationReducer(state.notification, action),
  user: userReducer(state.user, action)
});
