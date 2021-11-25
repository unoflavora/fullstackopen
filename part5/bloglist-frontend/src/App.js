import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/user'
import './App.css'
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
      }, 3000)

   
    } catch (e) {
      setError(e.response.data.error)
      setTimeout(() => {
        setError('')
      }, 3000)
    }
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


      <form onSubmit={handleSubmit}>
        <h2>Create new</h2>
        <label for='title'>Title
            <input value={title} onChange={({target}) => setTitle(target.value)} id='title' type='text'/>
          </label>
        <label for='author'>Author
          <input value={author} onChange={({target}) => setAuthor(target.value)} id='author' type='text'/>
        </label>
        <label for='url'>URL
          <input value={url} onChange={({target}) => setUrl(target.value)} id='url' type='text'/>
        </label>
        <button type='submit'>Submit</button>
      </form>
      

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App