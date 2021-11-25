import React, { useState, useEffect, useRef } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import NoteForm from "./components/NoteForm";
import Togglable from './components/Togglable'

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const noteFormRef = useRef()


  useEffect(() => {
    console.log("effect");
    noteService.getAll().then((initialNotes) => {
      console.log(initialNotes);
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = async (noteObject) => {
    try {
      const newNotes = await noteService.create(noteObject);
      setNotes(notes.concat(newNotes));
      noteFormRef.current.toggleVisibility()
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage("Wrong Credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const toggleImportanceOf = (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((notesUpdate) => {
        setNotes(notes.map((note) => (note.id !== id ? note : notesUpdate)));
      })
      .catch((e) => {
        alert(`${note} is already deleted`);
      });
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
      <LoginForm
        handleSubmit={handleLogin}
      />
    </Togglable>
    )
  };

  const noteForm = () => 
  <Togglable buttonLabel="new Note" ref={noteFormRef}>
    <NoteForm
    createNote = {addNote}
    />
  </Togglable>

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <div>
      <h1>Notes</h1>
      {errorMessage === null ? null : errorMessage}
      <div>
        {user === null && loginForm()}
        {user !== null && noteForm()}
      </div>
      <button onClick={() => setShowAll(!showAll)}>
        {showAll ? 'Show All' : 'Show Important'}
      </button>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={toggleImportanceOf}
          />
        ))}
      </ul>
    </div>
  );
};

export default App;
