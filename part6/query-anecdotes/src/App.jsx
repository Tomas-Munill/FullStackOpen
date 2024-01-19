import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useQueryClient, useMutation } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'
import { useNotificationDispatch } from "./NotificationContext"

const App = () => {
  const notificationDispatch = useNotificationDispatch()
  const queryClient = useQueryClient()
  const result = useQuery('anecdotes', getAnecdotes)

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updateAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      queryClient.setQueryData('anecdotes', 
      anecdotes.map(a => a.id === updateAnecdote.id 
        ? updateAnecdote 
        : a))
    },
  })

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    notificationDispatch({type:'SET_NOTIFICATION', payload: `you voted ${anecdote.content}`})
    setTimeout(() => notificationDispatch({type:'CLEAR_NOTIFICATION'}), 5000)
  }
  
  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data
  console.log(result)

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
