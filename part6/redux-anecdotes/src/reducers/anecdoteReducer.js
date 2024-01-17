import { createSlice } from "@reduxjs/toolkit";

/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/

/*
// Código sin utilizar redux toolkit

export const vote = (id) => {
  return {
    type: 'VOTE',
    data: {
      id: id
    }
  }
}

export const add = (content) => {
  return {
    type: 'ADD',
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToVote = state.find(a => a.id === id)
      const anecdoteVoted = {...anecdoteToVote, votes: anecdoteToVote.votes + 1}
      return state.map(anecdote => anecdote.id === id 
        ? anecdoteVoted 
        : anecdote)
    case 'ADD':
      return state.concat(action.data)
    default:
      return state
  }
}

export default reducer
*/

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
export default anecdoteSlice.reducer;