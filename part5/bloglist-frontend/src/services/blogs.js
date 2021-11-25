import axios from 'axios'

const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = async (title, author, url, user) => {
  const config = {
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  }
  
  const request = await axios.post(baseUrl, {title, author, url}, config)
  return request.data
}

export default { getAll, post }