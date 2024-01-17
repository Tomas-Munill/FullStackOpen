import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: '',
    reducers: {
        writeNotification(state, action) {
            return action.payload
        },
        deleteNotification() {
            return ''
        }
    }
})

export const setNotification = (text, seconds) => {
  return async (dispatch) => {
    dispatch(writeNotification(text))
    await new Promise(resolve => setTimeout(resolve, seconds * 1000));
    dispatch(deleteNotification())
  }
}

export const { writeNotification, deleteNotification } = notificationSlice.actions
export default notificationSlice.reducer