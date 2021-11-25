/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = '/api/blogs'

const getToken = () => JSON.parse(window.localStorage.getItem('user')).token

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

const addLike = async (blog) => {
  const config = {
    headers: {
      'Authorization': `bearer ${getToken()}`
    }
  }

  const request = await axios.put( `${baseUrl}/${blog.id}`, {...blog, user: blog.user.id, likes: blog.likes + 1}, config)
  return request.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: {
      'Authorization': `bearer ${getToken()}`
    }
  }

  const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return request.data
}

export default { getAll, post, addLike, deleteBlog }