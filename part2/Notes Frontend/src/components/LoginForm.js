import React, { useState } from "react";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    props.handleSubmit({
      username: username,
      password: password,
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2> Login </h2>
      <form onSubmit = {handleSubmit}>
        <p> username{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}/>
        </p>
        <p> password{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </p>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
