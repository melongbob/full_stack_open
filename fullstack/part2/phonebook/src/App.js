import React, { useState, useEffect } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [filter, setFilter] = useState('');
    const [message, setMessage] = useState(null);

    useEffect(() => {
            personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            });
    }, []);

    const addPersons = (event) => {
        event.preventDefault();

        const personObject = {
            name: newName,
            number: newNumber
        }

        if(persons.map(person => person.name).includes(newName)){
            if(window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){                
                const person = persons.find(person => person.name === newName);

                personService
                    .update(person.id, personObject)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson));
                        setNewName('');
                        setNewNumber('');
                        setMessage({
                            type: 'notification',
                            content: `Updated ${returnedPerson.name}`
                        });
                        setTimeout(() => {
                            setMessage(null);
                        }, 5000)
                    })
                    .catch(error => {
                        setNewName('');
                        setNewNumber('');
                        setMessage({
                            type: 'error',
                            content: error.response.data.error
                            //content: `Person ${person.name} was already removed from the server`
                        });
                        setTimeout(() => {
                            setMessage(null);
                        }, 5000)
                    });
            }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName('');
                    setNewNumber('');
                    setMessage({
                        type: 'notification',
                        content: `Added ${returnedPerson.name}`
                    });
                    setTimeout(() => {
                        setMessage(null);
                    }, 5000)
                })
                .catch(error => {
                    setMessage({
                        type: 'error',
                        content: error.response.data.error
                    })
                });
        }
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value);
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value);
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    }

    const handleDelete = (person) => {
        if(window.confirm(`Delete ${person.name} ?`))
            personService
                .remove(person.id)
                .then(
                    setPersons(persons.filter(p => p.id !== person.id))
                )
    }

    const personsToShow = filter === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()));

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={message} />
            <Filter filter={filter} handleFilterChange={handleFilterChange} />

            <h3>Add a new</h3>
            <PersonForm 
                addPersons={addPersons}
                newName={newName}
                handleNameChange={handleNameChange}
                newNumber={newNumber}
                handleNumberChange={handleNumberChange}
            />

            <h3>Numbers</h3>
            <Persons persons={personsToShow} handleDelete={handleDelete} />

        </div>
    );
}

export default App;