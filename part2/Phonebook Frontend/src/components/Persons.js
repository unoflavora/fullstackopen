import React from 'react'

const Persons = ({persons, filter, handleDelete}) => {
  if (filter !== "") {
    return persons
      .filter((person) =>
        person.Name.toLowerCase().includes(filter.toLowerCase())
      )
      .map((person) => (
        <p>
          {person.Name} {person.Num} <button onClick={()=>handleDelete(person.id)}>Delete</button>
        </p>
      ));
  }
  return persons.map(person => (
    <p>
      {person.Name} {person.Num} <button onClick={()=>handleDelete(person.id)}>Delete</button>
    </p>
  ));
};

export default Persons
