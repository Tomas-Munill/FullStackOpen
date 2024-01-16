import { createSlice } from "@reduxjs/toolkit";

/*
// Código sin utilizar redux toolkit

export const filterChange = filter => {
    return {
        type: 'SET_FILTER',
        filter: filter
    }
}

const reducer = (state = '', action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'SET_FILTER': 
      return action.filter
    default:
      return state
  }
}

export default reducer
*/

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer