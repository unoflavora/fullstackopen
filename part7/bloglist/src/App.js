import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Routes, Route, useLocation } from 'react-router-dom'
import Blogs from './components/Blogs'
import Users from './components/Users'
import Login from './components/Login'
import UserList from './components/UserList'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import BlogDetails from './components/BlogDetails'
import { getAll } from './reducers/blogReducer'


const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    dispatch({type: 'INIT'})
    dispatch(getAll())
  }, []) 

  return (
    <>
    <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<ProtectedRoute/>}>
          <Route index element={<Blogs />} />
          <Route path='users' element={<Users />}/>
          <Route path='users/:id' element={<UserList />} />
          <Route path='blogs/:id' element={<BlogDetails />} />
        </Route>
    </Routes>
    </>
  )
}

export default App