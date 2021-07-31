import React, { useState } from "react";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456" },
    { name: "Ada Lovelace", number: "39-44-5323523" },
    { name: "Dan Abramov", number: "12-43-234345" },
    { name: "Mary Poppendieck", number: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

    if (hasName) {
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return;
    }
    if (newName === "") {
      alert("Please enter your name!");
      return;
    }

    const newObject = {
      name: newName,
      number: newNumber,
    };

    setPersons(persons.concat(newObject));
    setNewName("");
    setNewNumber("");
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
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
