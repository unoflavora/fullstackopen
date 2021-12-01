import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../services/user";
import React from "react";
import { Link, Outlet } from "react-router-dom";

function Users() {
  const blogs = useSelector(state => state.blogs)
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.users().then((data) => {
      setUsers(data)  
    }).catch(e => console.log(e))
  },[blogs])

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>Number of Blogs</th>
        </tr>
        {users.map(user => {
          return(
          <tr>
            <td>
              <Link to={`/users/${user.id}`}>
                {user.username}
              </Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )})}
      </table>
    </div>
  );
}

export default Users;