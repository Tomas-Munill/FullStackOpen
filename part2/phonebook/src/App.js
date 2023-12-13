import React, { useEffect, useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import People from './components/People';
import Notification from './components/Notification';
import peopleService from './services/PeopleService';


const App = () => {
  const [ persons, setPersons ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ filter, setFilter ] = useState('');
  const [ notificationMessage, setNotificationMessage ] = useState(null);
  const [ isSuccessful, setIsSuccessful ] = useState(null);


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
        .then(() => {
          setPersons(persons.filter(p => p.id !== personToDelete.id))
          setIsSuccessful(true);
          setNotificationMessage(`Removed ${name}`);
          setTimeout(() => setNotificationMessage(null), 5000);
        })
      .catch(error => {
         console.error('Se produjo un error al eliminar:', error)
         /* debo actualizar el listado de personas desde el servidor, si lo saco de la lista de persons directamente esta mal porque la promesa podría no ser cumplida debido a otra cosa como 
         por ej: se cae el servidor */
         peopleService.getAll()
         .then(persons => setPersons(persons))
         .catch(error => console.error('Se produjo un error al consultar:', error));

         setIsSuccessful(false);
         setNotificationMessage(`Information of ${name} has already been removed from server`);
         setTimeout(() => setNotificationMessage(null), 5000);
        });
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
        setIsSuccessful(true);
        setNotificationMessage(`Added ${newPerson.name}`);
        setTimeout(() => setNotificationMessage(null), 5000);
      })
        .catch(error => {
          console.error('Se produjo un error al insertar:', error.response.data);
          setIsSuccessful(false);
          setNotificationMessage(error.response.data.error);
          setTimeout(() => setNotificationMessage(null), 5000);
        });    
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        peopleService.updateNumber(personaEncontrada.id, newPerson)
        .then((person) => {
          setPersons(persons.map(p => person.id !== p.id ? p : newPerson));
          setNewName('');
          setNewNumber('');
          setIsSuccessful(true);
          setNotificationMessage(`Updated ${newPerson.name}`);
          setTimeout(() => setNotificationMessage(null), 5000);
        })
        .catch(error => {
          console.error('Se produjo un error al actualizar:', error.response.data);
          setIsSuccessful(false);
          setNotificationMessage(error.response.data.error);
          setTimeout(() => setNotificationMessage(null), 5000);
        });
      }
    }
  }

  const peopleToShow = filter 
    ? persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase())) 
    : persons;

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification mensaje={notificationMessage} isSuccessful={isSuccessful}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <People peopleToShow={peopleToShow} handlerDeleteClick={handlerDeleteClick}/>
    </div>
  )
};

export default App;
