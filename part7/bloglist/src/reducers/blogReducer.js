import blogService from "../services/blogs"
import { addError, addSuccess } from "./notificationReducer"

export default function reducer(state = [], action) {
  switch(action.type) {
    case 'GET ALL':
      return action.data
    case 'ADD':
      return state.concat(action.data)
    case 'COMMENT':
      return state.map(blog => {
        return blog.id === action.data.blog.id ? action.data.blog : blog
      })
    case 'DELETE':
      return state.filter(blog => blog.id !== action.data)
    case 'LIKE':
      return state.map(blog => {
        blog.id === action.data ? blog.likes = blog.likes + 1 : null
        return blog
      })
    default:
      return state
  }
}

export const getAll = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      type: 'GET ALL',
      data: data
    })
  }
}

export const add = (title, author, url, user) => {
  return async dispatch => {
    try {
      const data = await blogService.post(title, author, url, user)
      dispatch({
        type: 'ADD',
        data: data.newBlog
      })
      dispatch(addSuccess(`${title} by ${author} is added!`))  
    } catch(e) {
      dispatch(addError(e.response.data.error))
    }
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    try {
      const response = await blogService.addComment(id, comment)
      dispatch({
        type: 'COMMENT',
        data: { blog: response.blog }
      })
      dispatch(addSuccess(`${comment} is posted!`))  
    } catch(e) {
      dispatch(addError(e.response.data.error))
    }
  }
}

export const like = (blog) => {
  return async dispatch => {
   try {
    await blogService.addLike(blog)
    dispatch({
      type: 'LIKE',
      data: blog.id
    })
    dispatch(addSuccess(`${blog.title} by ${blog.author} is liked!`))
   } catch(e) {
     const message = e.message || e.response.data.error
     dispatch(addError(message))
   }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog)
    dispatch({
      type: 'DELETE',
      data: blog.id
    })
    dispatch(addSuccess(`${blog.title} by ${blog.author} is deleted!`))
  }
}

