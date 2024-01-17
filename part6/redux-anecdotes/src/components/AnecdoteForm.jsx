import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
import { setNotification, deleteNotification } from "../reducers/notificationReducer";
import anecdoteService from "../services/anecdotes"

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew({
      content: content,
      votes: 0
    })
    dispatch(add(newAnecdote));
    dispatch(setNotification(`you created ${content}`))
    setTimeout(() => {
      dispatch(deleteNotification())
    }, 5000)
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
