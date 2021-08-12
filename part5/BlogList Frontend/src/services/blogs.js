import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = (newToken) => {
  // eslint-disable-next-line no-unused-vars
  token = `bearer ${newToken}`
}

const submitBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token }
  }
  return await axios.post(baseUrl, newBlog, config)
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll, setToken, submitBlog }