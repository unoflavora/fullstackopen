import './App.css';
import React, {useState} from 'react'


const App = () => {
  const array = new Array(8).join('0').split('').map(parseFloat)
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState([...array])

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  function Random() {
    let num = Math.floor(Math.random() * (7 - 0) + 0);
    setSelected(num)
  }

  function setVotes() {
    let newVotes = [...votes]
    newVotes[selected] = newVotes[selected] + 1
    setVote(newVotes)
  }

  function findMax() {
    return votes.indexOf(Math.max(...votes))
  }


  return (
    <div>
      <h1>Anecdote of the day: </h1>
      <h2>{anecdotes[selected]} </h2>
      <p>has {votes[selected]} votes</p>
      <button onClick={Random}>next anecdote</button>
      <button onClick={setVotes}>Vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[findMax()]}</p>
      <p>With {votes[findMax()]} values</p>
    </div>

  )

}

export default App;
