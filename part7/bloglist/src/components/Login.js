import { login } from "../reducers/userReducer"
import { useDispatch, useSelector } from "react-redux"
import useInput from "./hooks/useInput"
import React from "react"
import { Navigate, useNavigate } from "react-router"

function Login() {
  const notification = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const username = useInput('text')
  const password = useInput('password')

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(username.value, password.value)
    await dispatch(login(username.value, password.value))
    navigate('/')
  }

  if (user) {
    return(
      <Navigate to='/'/>
    )
  }

  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>        
      {notification}
      <div className='flex items-center gap-10 border-2 p-10 rounded-xl bg-yellow-300 border-blue-400'>
      <h2 className='text-xl bg-blue-500 p-4 rounded-2xl text-white font-semibold'>Login to application</h2>
      
      <form onSubmit={handleLogin} className='flex'>
        <label className='flex items-center gap-1 text-lg font-sans' htmlFor='username'>username
          <input className='rounded-full px-5 py-2' id='username' {...username}/>
        </label>
        <label className='flex items-center gap-1 text-lg font-sans' htmlFor='password'>password
          <input className='rounded-full px-5 py-2' id='password' {...password}/>
        </label>
        <button
         className='bg-green-300 px-5 py-2 rounded-2xl text-white'
         htmlFor="login-button" type='submit'>Login</button>
      </form>
      </div>
     
    </div>
  );
}

export default Login;