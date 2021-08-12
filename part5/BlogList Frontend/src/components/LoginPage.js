const LoginForm = (props) => {
  return (
    <div>
      <form onSubmit={props.loginHandler}>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={props.username}
          onChange={(e) => props.setUsername(e.target.value)}>
        </input>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          id="password"
          value={props.password}
          onChange={(e) => props.setPassword(e.target.value)}>
        </input>
        <br/>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm