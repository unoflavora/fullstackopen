import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import React from "react"
import userService from "../services/user";
function UserList() {
  let params = useParams();
  const [user, setUser] = useState()

  useEffect(() => {
    userService.users().then((data) => {
      const res = data.filter(user => user.id === params.id)
      console.log(res[0])
      setUser(res[0])
    }).catch(e => console.log(e))
  },[])


  return (
    <div> 
      {user && <div>
        <h1>{user.name}</h1>
        <h2>Added Blogs</h2>
        <ul>
          {user.blogs.map((blog)=> {
            return(
              <Link to={`/blogs/${blog.id}`}>
                <li key={blog.id}>{blog.title}</li>
              </Link>
            )
          })}
        </ul>
      </div>}     
    </div>
  );
}

export default UserList