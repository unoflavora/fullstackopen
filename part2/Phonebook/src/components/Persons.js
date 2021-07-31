import React from 'react'

const Persons = ({persons, filter}) => {
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
  return persons.map((person) => (
    <p>
      {person.name} {person.number}
    </p>
  ));
};

export default Persons
