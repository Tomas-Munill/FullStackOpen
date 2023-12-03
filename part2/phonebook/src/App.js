import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import People from './components/People';
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
        .then(response => {
          setPersons(response.data)
        })
  },[]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    //console.log(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();

    // validar que no exista en la lista
    let personaEncontrada = persons.find(p => p.name === newName);
    if (personaEncontrada === undefined) {
      const newPerson = {
        name: newName,
        number: newNumber
      };
      setPersons(persons.concat(newPerson));
      setNewName('');
      setNewNumber('');
      // console.log(newPerson);
    } 
    else {
      alert(`${newName} is already added to phonebook`);
    }
  }

  const peopleToShow = filter 
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) 
    : persons;
  console.log(peopleToShow)

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <People peopleToShow={peopleToShow}/>
    </div>
  )
};

export default App;
