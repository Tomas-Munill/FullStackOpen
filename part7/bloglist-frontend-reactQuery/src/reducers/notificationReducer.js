const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SUCCESSFUL_NOTIFICATION':
      return { message: action.payload, isSuccessful: true };
    case 'SET_ERROR_NOTIFICATION':
      return { message: action.payload, isSuccessful: false };
    case 'CLEAR_NOTIFICATION':
      return { message: '', isSuccessful: false };
    default:
      return state;
  }
};

export const showAndClearNotification = (message, isSuccessful, dispatch) => {
  dispatch({
    type: isSuccessful
      ? 'SET_SUCCESSFUL_NOTIFICATION'
      : 'SET_ERROR_NOTIFICATION',
    payload: message,
  });
  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' });
  }, 5000);
};

export default notificationReducer;
