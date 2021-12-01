import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { Link } from "react-router-dom";
function Header() {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const handleLogout = () => {
    dispatch({ type:'LOGOUT' })
  }

  if(!user) {
    return null
  }

  return (
    <div className='w-full flex-col flex justify-center items-center'>
<nav className='w-full bg-yellow-300 text-white flex gap-10 py-5 items-center justify-center' >
    <h2 className='text-3xl italic font-bold'>blogs</h2>

      <ul className='flex w-full justify-between gap-10 text-lg font-semibold list-none' >
        <div className='h-full flex gap-5'>
        <li className='hover:text-black hover:bg-white'><Link to='/'>Blogs</Link></li>
        <li className='hover:text-black hover:bg-white'><Link to='/users'>Users</Link></li>
        </div>
        <li className='flex gap-5'>
          {user.name} Logged in 
          <button className='bg-red-400 px-5 rounded-full' id='logout-button' onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </nav>
    {notification}
    </div>
    
    

  );
}

export default Header;