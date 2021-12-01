import Blog from './Blog'
import Togglable from './Togglable'
import NewNote from './NewNote'
import useBlogs from './hooks/useBlog'
import { add } from '../reducers/blogReducer'
import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'


export default function Blogs() {
  const [blogs] = useBlogs()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 
  const visibilityRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(add(title, author, url, user))     
    visibilityRef.current.toggleVisibility()
  }



  return (
    <div>
    <Togglable ref={visibilityRef} hideLabel='cancel' label={'create new blog'}>
      <NewNote
        handleSubmit={handleSubmit}
        title={title} setTitle={setTitle} 
        author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
    </Togglable>
    
    <div className='grid grid-cols-2 gap-10'>
    {blogs.sort((a,b) => b.likes - a.likes).map(blog => {
      return(
        <Blog key={blog.id} blog={blog} />
      )
    }
    )}
    </div>
   
  </div>
  );
}

