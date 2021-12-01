import React  from 'react'
import { Link } from 'react-router-dom'

const Blog = ({blog}) => {  
  return (
    <Link to={`/blogs/${blog.id}`}>
      <div className='blog' className='border-4 rounded-2xl py-5 flex items-center justify-center hover:bg-yellow-300 hover:text-white text-lg' style={blogStyle}>
        <p id='blog-title'>{blog.title} by {blog.author}</p>
      </div>
    </Link>
)}

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  borderWidth: 1,
  marginBottom: 5
}

export default Blog