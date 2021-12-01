import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import React from "react";
import { like, addComment } from "../reducers/blogReducer";
import useInput from "./hooks/useInput";

function BlogDetails() {
  const params = useParams()
  const dispatch = useDispatch()
  const newComment = useInput('text')
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(data => data.id === params.id)[0]

  const handleLike = () => {
    dispatch(like(blog))
  }

  const comment = (event) => {
    event.preventDefault() 
    dispatch(addComment(blog.id, newComment.value))
  }

  if(!blog) {
    return (
      <div>Not Found</div>
    )
  }

  console.log(blog)
  return (
    <div className='flex justify-center items-center py-10 '>
      <div className='flex flex-col gap-5 text-center bg-yellow-300 py-10 px-40 rounded-2xl'>
        <h1 className='text-3xl font-bold'> {blog.title} </h1>
        <p className='text-lg font-semibold'> {blog.url} </p>

        <p> added by 
            <span className='font-semibold'> 
              {` ${blog.user.username}`}
            </span>
        </p>

        <div className='flex justify-center items-center gap-5 text-center'>
          <p>{blog.likes} Likes</p>
        <button className='bg-blue-400 text-white p-2 rounded-2xl' onClick={() => handleLike()}>Like</button>
        </div> 



        <div>
        <h2 className='font-bold'>Comments</h2>
        <ul>
          {blog.comments ? blog.comments.map((comment, index) => {
            return (
              <li key={index}>{comment}</li>
            )}
          ): null}
        </ul>
        </div>

        <form onSubmit={(event) => comment(event)}>
          <input className='py-2 px-5 rounded-xl' {...newComment}></input>
          <button className='bg-blue-400 text-white py-2 px-5 rounded-2xl' type='submit'>Add Comment</button>
        </form>
       
      </div>

    </div>
  );
}

export default BlogDetails;
