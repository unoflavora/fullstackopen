/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const init = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const add = async (anecdote) => {
  const response = await axios.post(baseUrl, {...anecdote})
  return response.data
}

const vote = async (id, votes) => {
  const response = await axios.patch(`${baseUrl}/${id}`, {votes})
  return response.data
}

export default { init, add, vote }