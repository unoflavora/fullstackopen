import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
const Blog = (props) => {  
  const [blog, setBlog] = useState(props.blog)
  const [visibility, setVisibility] = useState(false)
  const index = props.blogs.indexOf(blog)

  const handleLike = async () => {
    props.test ? props.test() : null
    
    try {
      await blogService.addLike(blog)
      const addedBlog = {...blog, likes: blog.likes + 1}
      const newBlogs = [...props['blogs']]
      newBlogs[index] = addedBlog

      props.setBlogs(newBlogs)
      setBlog(addedBlog)
    } catch(e) {
      console.log(e)
    }
  }

  const handleDelete = async () => {
    try {
      await blogService.deleteBlog(blog)
      alert(`Remove blog ${blog.title} by ${blog.url}`)
      const newBlogs = [...props['blogs']]
      newBlogs.splice(index, 1)
      props.setBlogs(newBlogs)
    } catch (e) {
      props.setError(e.response.data.error)
      setTimeout(() => {
        props.setError('')
      }, 3000)
    }
  }

  const handleVisibility = () => setVisibility(!visibility)
  return (
    <div className='blog' style={blogStyle}>
      <p id='blog-title'>{blog.title} by {blog.author}</p>
      <button id={`visibility-button-${index}`} onClick={handleVisibility}>
        {visibility ? 'Hide' : 'Show'}
      </button>

      {visibility && 
        <div className='hidden'>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}  
          <button id='like-button' onClick={handleLike}>Like</button></p>
          <button id='delete-button' onClick={handleDelete}>remove</button>
        </div>
      }
    </div>  
)}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

export default Blog