import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import People from './components/People';
import peopleService from './services/PeopleService';

const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');

  useEffect(() => {
    peopleService.getAll()
    .then(persons => setPersons(persons))
    .catch(error => console.error('Se produjo un error al consultar:', error));
  },[]);

  const handleFilterChange = (event) => setFilter(event.target.value);

  const handleNameChange = (event) => setNewName(event.target.value);

  const handleNumberChange = (event) => setNewNumber(event.target.value);

  const handlerDeleteClick = (name) => {
    if (window.confirm(`Delete ${name}?`)) {
      let personToDelete = persons.find(p => p.name === name);
      peopleService.deletePerson(personToDelete.id)
        .then(() => setPersons(persons.filter(p => p.id !== personToDelete.id)))
      .catch(error => console.error('Se produjo un error al eliminar:', error));
    }
  }

  const addPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber
    };

    // validar que no exista en la lista
    let personaEncontrada = persons.find(p => p.name === newName);
    if (personaEncontrada === undefined) {

      // enviar datos al servidor
      peopleService.create(newPerson)
      .then(person => {
        setPersons(persons.concat(person));
        setNewName('');
        setNewNumber('');
      })
      .catch(error => console.error('Se produjo un error al insertar:', error));    
    } 
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        peopleService.updateNumber(personaEncontrada.id, newPerson)
        .then((person) => {
          setPersons(persons.map(p => person.id !== p.id ? p : newPerson));
          setNewName('');
          setNewNumber('');
        })
        .catch(error => console.error('Se produjo un error al actualizar:', error));
      }
    }
  }

  const peopleToShow = filter 
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) 
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <People peopleToShow={peopleToShow} handlerDeleteClick={handlerDeleteClick}/>
    </div>
  )
};

export default App;
