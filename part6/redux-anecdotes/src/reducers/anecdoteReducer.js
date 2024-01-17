import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    add(state, action) {
      return state.concat(action.payload)
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const anecdoteVoted = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id === id 
        ? anecdoteVoted 
        : anecdote)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { add, vote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew({
      content: content,
      votes: 0
    })
    dispatch(add(newAnecdote))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.updateAnecdote(anecdote.id, {...anecdote, votes: anecdote.votes + 1})
    dispatch(vote(anecdote.id))
  }
}

export default anecdoteSlice.reducer;