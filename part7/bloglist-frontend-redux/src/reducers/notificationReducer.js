import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    isSuccessful: false,
  },
  reducers: {
    setSuccessfulMessage(state, action) {
      state.message = action.payload;
      state.isSuccessful = true;
    },
    setErrorMessage(state, action) {
      state.message = action.payload;
      state.isSuccessful = false;
    },
    clearMessage(state, action) {
      state.message = '';
      state.isSuccessful = false;
    },
  },
});

export const { setSuccessfulMessage, setErrorMessage, clearMessage } =
  notificationSlice.actions;
export default notificationSlice.reducer;
