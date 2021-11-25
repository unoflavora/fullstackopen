import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/user'
import './App.css'
import Togglable from './components/Togglable'
import NewNote from './components/NewNote'
import PropTypes from 'prop-types';
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('') 
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const visibilityRef = useRef()

  useEffect(() => {
    const loggedUser = userService.getUser()
    if(!loggedUser) {
      setUser(null)
    } else {
      setUser(loggedUser)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const loggedUser = await userService.login(username, password)
      setUser(loggedUser)
      userService.setUser(loggedUser)
    } catch (e) {
      setError(e.response.data.error)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  if(user === null) {
    return (
      <div>        
        <h2>Login to application</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleLogin}>
          <label for='username'>username
            <input value={username} onChange={({target}) => setUsername(target.value)} id='username' type='text'/>
          </label>
          <label for='password'>password
            <input value={password} onChange={({target}) => setPassword(target.value)} id='password' type='password'/>
          </label>
          <button type='submit'>Login</button>
        </form>
      </div>
    )
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      await blogService.post(title, author, url, user)
      setSuccess(
        `A new blog titled ${title} by ${author} added!`
      )

      setBlogs([...blogs, {
        title, author, url
      }])

      setTitle('')
      setAuthor('')
      setUrl('')

      setTimeout(() => {
        setSuccess('')
        window.location.reload()
      }, `1000`)

   
    } catch (e) {
      setError(e.response.data.error)
      setTimeout(() => {
        setError('')
      }, 3000)
    }

    visibilityRef.current.toggleVisibility()
  }


  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} Logged in 
        <button onClick={handleLogout}>Logout</button>
      </p>

      {error && <p className='error'>{error}</p>}
      {success && <p className='success'>{success}</p>}

      <Togglable ref={visibilityRef} hideLabel='cancel' label={'create new blog'}>
        <NewNote
          handleSubmit={handleSubmit}
          title={title} setTitle={setTitle} 
          author={author} setAuthor={setAuthor} url={url} setUrl={setUrl}/>
      </Togglable>
      

      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} />
      )}
    </div>
  )
}

export default App