import { useDispatch } from "react-redux";
import { add } from "../reducers/anecdoteReducer";
import { setNotification, deleteNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const createAnecdote = () => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(add(content));
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
