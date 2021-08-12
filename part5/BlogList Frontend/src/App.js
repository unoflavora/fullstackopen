import React, { useState, useEffect } from "react";
import LoggedInPage from "./components/LoggedInPage";
import LoginPage from "./components/LoginPage";
import blogService from "./services/blogs";
import loginService from "./services/login";
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newBlog, setNewBlog] = useState({});
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [information, setInformation] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);


  useEffect(() => {
    const saved = JSON.parse(window.localStorage.getItem("loggedBloglistUser"));
    if (saved) {
      setUser(saved);
      blogService.setToken(saved.token)
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await blogService.submitBlog(newBlog)
        const newBlogs = blogs.concat(response.data)
        setBlogs(newBlogs)
        setInformation(`a new blog '${newBlog.title}' by ${newBlog.author} is added!`)
        setTimeout(() => {
          setInformation(null);
        }, 5000);
      } catch (error) {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
    if (newBlog.title) {
      fetchData()
    }
  }, [newBlog])

  const loginHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await loginService.Login(username, password);
      blogService.setToken(response.data.token);
      window.localStorage.setItem(
        "loggedBloglistUser",
        JSON.stringify(response.data)
      );
      setUser(response.data);
      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
      setErrorMessage(error.response.data.error);
      setUsername("");
      setPassword("");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const logoutHandler = () => {
    window.localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  const submitHandler = async (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <h2>blogs</h2>
      {errorMessage !== null && <p id='error'>{errorMessage}</p>}
      {information !== null && <p id='information'>{information}</p>}

      <div>
        {user ? (
          <LoggedInPage
            name={user.name}
            logoutHandler={logoutHandler}
            blogs={blogs}
            setNewBlog={setNewBlog}
            submitHandler={submitHandler}
          />
        ) : (
          <LoginPage
            setUsername={setUsername}
            username={username}
            setPassword={setPassword}
            password={password}
            loginHandler={loginHandler}
          />
        )}
      </div>
    </div>
  );
};

export default App;
