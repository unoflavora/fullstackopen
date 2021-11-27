import { connect } from "react-redux";
import { addAnecdote } from "../reducers/anecdoteReducer";
import { notify } from "../reducers/notificationReducer";

function AnecdoteForm(props) {

  const add = async (event) => {
    event.preventDefault()
    props.addAnecdote(event.target.note.value)
    props.notify(`You added ${event.target.note.value}`, 5000)
  }
  return (
    <form onSubmit={add}>
        <h2>create new</h2>
        <div><input name='note' /></div>
        <button>create</button>
    </form>
  );
}

const mapDispatchToProps = {
  addAnecdote,
  notify
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)