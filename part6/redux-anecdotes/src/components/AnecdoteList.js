import { useDispatch, useSelector } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { notify, reset } from "../reducers/notificationReducer";
function AnecdoteList() {
  const anecdotes = useSelector(state => state.anecdote.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()
  
  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id, anecdote.votes + 1))
    dispatch(notify(`you voted '${anecdote.content}'`, 5000))
  }

  console.log(anecdotes)

  return (
    anecdotes.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
}

export default AnecdoteList;