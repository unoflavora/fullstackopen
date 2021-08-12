import Blog from './Blog'

const Blogs = (props) => {
  return (
    props.blogs.map((blog) => <Blog key={blog.id} blog={blog} />)
  )
}

export default Blogs