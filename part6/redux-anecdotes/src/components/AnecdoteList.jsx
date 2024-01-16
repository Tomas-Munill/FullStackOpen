import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification, deleteNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if ( state.filter === '') {
        return state.anecdotes
    }
    else {
        return state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
    }
  })
  const dispatch = useDispatch()

  return (
    <>
        {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => {
              dispatch(vote(anecdote.id))
              dispatch(setNotification(`you voted ${anecdote.content}`))
              setTimeout(() => {
                dispatch(deleteNotification())
              }, 5000)
              }}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList