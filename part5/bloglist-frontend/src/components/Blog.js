import React, { useState } from 'react'
import Togglable from './Togglable'
import blogService from '../services/blogs'
const Blog = (props) => {  
  const [blog, setBlog] = useState(props.blog)

  const handleLike = async () => {
    try {
      await blogService.addLike(blog)
      setBlog({...blog, likes: blog.likes + 1})
    } catch(e) {
      console.log(e.response.data.error)
    }
  }

  const handleDelete = async () => {
    try {
      await blogService.deleteBlog(blog)
      alert(`Remove blog ${blog.title} by ${blog.url}`)
      const newBlogs = [...props['blogs']]
      const index = props.blogs.indexOf(blog)
      newBlogs.splice(index, 1)
      props.setBlogs(newBlogs)
    } catch (e) {
      alert(e.response.data.error)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      {blog.title} 
      <Togglable label={'view'} hideLabel={'hide'}>
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes}  <button onClick={handleLike}>Like</button></p>
          <p>{blog.author}</p>
          <button onClick={handleDelete}>remove</button>
        </div>
      </Togglable>
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