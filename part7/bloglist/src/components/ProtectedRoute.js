import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";
import Header from "./Header";
export default function ({children, ...otherProps}) {
  const user = useSelector(state => state.user)

  return !user ? <Navigate to='/login'/> : 
    <div>
        <Header/>
        <Outlet />
    </div>
}