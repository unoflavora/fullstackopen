/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios'

const baseUrl = `${BACKEND_URL}/api/blogs`

const getToken = () => JSON.parse(window.localStorage.getItem('user')).token
const getUser = () => JSON.parse(window.localStorage.getItem('user'))

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
  })
}

const post = async (title, author, url, user) => {
  const config = {
    headers: {
      'Authorization': `bearer ${user.token}`
    }
  }
  
  const request = await axios.post(baseUrl, {title, author, url, user}, config)
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

const addComment = async (id, comment) => {
  const config = {
    headers: {
      'Authorization': `bearer ${getToken()}`
    }
  }

  console.log(id)

  const request = await axios.post(`${baseUrl}/${id}/comments`, {comment}, config)
  console.log(request)
  return request.data
}

const deleteBlog = async (blog, user) => {
  const config = {
    headers: {
      'Authorization': `bearer ${getToken()}`
    }
  }

  const request = await axios.delete(`${baseUrl}/${blog.id}`, config, {user: getUser()})
  return request
}

export default { getAll, post, addLike, deleteBlog, addComment }