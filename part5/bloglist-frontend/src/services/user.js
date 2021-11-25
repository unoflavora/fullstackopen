/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const setUser = user => window.localStorage.setItem('user', JSON.stringify(user))

const getUser = () => JSON.parse(window.localStorage.getItem('user'))


const login = async (username, password) => {
  const response = await axios.post('/api/login', {username, password})
  return response.data
}

export default {getUser, setUser, login}