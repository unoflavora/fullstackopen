import React from 'react'

const Note = ({ note, toggleImportance }) => {
  return (
    <li>{note.content}
      <button onClick={() => toggleImportance(note.id)}>
        {note.important === true ? 'make not important' : 'make important'}
      </button></li>
  )
}

export default Note