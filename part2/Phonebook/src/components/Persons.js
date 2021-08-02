import React from 'react'

const Persons = ({persons, filter, handleDelete}) => {
  if (filter !== "") {
    return persons
      .filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((person) => (
        <p>
          {person.name} {person.number}
        </p>
      ));
  }
  return persons.map(person => (
    <p>
      {person.name} {person.number} <button onClick={()=>handleDelete(person.id)}>Delete</button>
    </p>
  ));
};

export default Persons
