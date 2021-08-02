import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import server from "./services/server";
import './App.css'
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [alerts, setAlert] = useState({});

  const hook = () => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  };
  useEffect(hook, []);

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
    let hasName = persons.some((person) => person["name"] === newName);
    const newObject = {
      name: newName,
      number: newNumber,
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
          .then((update) =>
            setPersons(
              persons.map(person => person.id === personName.id ? update : person)
            )
          )
          .catch(e => {
            setAlert({'already_removed' : `Information of ${personName.name} has already been removed from server`})
            hook()
            })
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
      .catch((e) => alert(e));

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you sure want to delete?")) {
      server
        .del(id)
        .then((updatedPhonebook) => {
          let deleted = persons.find(person => person.id === id)
          setAlert({'removed': `Information of ${deleted.name} is successfully removed`})
          hook()
        })
        .catch((e) => console.log(e));
    }
  };

  const showAlert = (alerts) => {
    console.log(alerts)
    if (alerts === null){
      return null
    } 
    if (alerts.removed) {
      return <p className='removed'>{alerts.removed}</p>
    }
    if (alerts.added) {
      return <p className='success'>{alerts.added}</p>
    }

    if(alerts.already_removed) {
      return <p className='error'>{alerts.already_removed}</p>
    }
  }

  return (
    <div>
      {showAlert(alerts)}
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
