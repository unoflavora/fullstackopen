import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { initialize } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'


const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initialize())
  }, [dispatch])
  
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App