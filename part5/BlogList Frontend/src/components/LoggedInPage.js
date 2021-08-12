import BlogList from "./BlogList";
import BlogInput from './BlogInput'

const LoginPage = (props) => {
  return (
    <div>
      <p>{props.name} is logged in <button onClick={props.logoutHandler}>Logout</button></p> 
      <BlogList blogs={props.blogs}/>
      <h2>New Blog</h2>
      <BlogInput setNewBlog={props.setNewBlog} submitHandler={props.submitHandler}/>
    </div>
  )
};

export default LoginPage