function NewNote({handleSubmit, title, setTitle, author, setAuthor, url, setUrl}) {
  return (
    <form onSubmit={handleSubmit}>
    <h2>Create new</h2>
    <label htmlFor='title'>Title
        <input value={title} onChange={({target}) => setTitle(target.value)} id='title' type='text'/>
      </label>
    <label htmlFor='author'>Author
      <input value={author} onChange={({target}) => setAuthor(target.value)} id='author' type='text'/>
    </label>
    <label htmlFor='url'>URL
      <input value={url} onChange={({target}) => setUrl(target.value)} id='url' type='text'/>
    </label>
    <button type='submit' id='submit-button'>Submit</button>
  </form>
  );
}

export default NewNote;