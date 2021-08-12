import {useState} from 'react'

const BlogInput = (props) => {
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  const submitHandler = (event) => {
    props.setNewBlog({
      author,
      title,
      url
    })
    props.submitHandler(event)
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <form onSubmit={submitHandler}>
      <p>Author <input value={author} onChange={(e)=>setAuthor(e.target.value)}/> </p>
      <p>Title{'  '}<input value={title} onChange={(e)=>setTitle(e.target.value)}/> </p>
      <p>Url <input value={url} onChange={(e)=>setUrl(e.target.value)}/> </p>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default BlogInput