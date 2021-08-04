import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import ShowAlert from "./components/ShowAlert";
import server from "./services/server";
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [alerts, setAlert] = useState({});

  useEffect(() => server.get().then(response =>setPersons(response)), [])

  const handleInputChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberInput = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterInput = (event) => {
    setFilter(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let hasName = persons.find((person) => person["name"] === newName);
    const newObject = {
      Name: newName,
      Num: newNumber,
    };

    if (hasName) {
      let personName = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with new one?`
        )
      ) {
        server
          .update(personName.id, newObject)
          .then(update =>
            setPersons(persons.map(person => person.id === personName.id ? update : person))
          )
          .catch(e => setAlert(e))
      setNewName("");
      setNewNumber("")
      return;
    }}
    if (newName === "") {
      alert("Please enter your name!");
      return;
    }

    server
      .add(newObject)
      .then((returned) => {
        setPersons(persons.concat(returned))
        setAlert({'added':`Added ${returned.name}`})
    })
      .catch(e => setAlert(e));

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you sure want to delete?")) {
      server
        .del(id)
        .then((del) => {
          let deleted = persons.find(person => person.id === id)
          setAlert({'removed': `Information of ${deleted.Name} is successfully removed`})
          setPersons(persons.filter((person) => person.id !== deleted.id))
        })
        .catch((e) => setAlert(e));
    }
  };

  return (
    <div>
      <ShowAlert alert={alerts}/>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterInput={handleFilterInput} />
      <h2>add a new</h2>
      <PersonForm
        name={newName}
        number={newNumber}
        numberChange={handleNumberInput}
        textChange={handleInputChange}
        submit={handleSubmit}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDelete={handleDelete} />
    </div>
  );
  };

export default App
