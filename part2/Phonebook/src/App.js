import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import axios from "axios";
import server from "./services/server";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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
      let id = persons.find((person) => person.name === newName).id;
      console.log(id);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace old number with new one?`
        )
      ) {
        server
          .update(id, newObject)
          .then((update) =>
            setPersons(
              persons.map(person => person.id === id ? update : person)
            )
          )
          .catch((e) => alert(e));
      }
      setNewName("");
      setNewNumber("")
      return;
    }
    if (newName === "") {
      alert("Please enter your name!");
      return;
    }

    server
      .add(newObject)
      .then((returned) => setPersons(persons.concat(returned)))
      .catch((e) => alert(e));

    setNewName("");
    setNewNumber("");
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you sure want to delete?")) {
      server
        .del(id)
        .then((updatedPhonebook) => hook())
        .catch((e) => console.log(e));
    }
  };

  return (
    <div>
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

export default App;
