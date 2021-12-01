/* eslint-disable import/no-anonymous-default-export */
import axios from "axios"

const setUser = user => window.localStorage.setItem('user', JSON.stringify(user))

const getUser = () => JSON.parse(window.localStorage.getItem('user'))

const login = async (username, password) => {
  const response = await axios.post(`${BACKEND_URL}/api/login`, {username, password})
  return response.data
}

const users = async () => {
  const response = await axios.get(`${BACKEND_URL}/api/users`)
  return response.data
}

export default {getUser, setUser, login, users}