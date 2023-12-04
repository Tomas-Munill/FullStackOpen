import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
    return axios.get(baseUrl)
    .then(response => response.data)
}

const create = (newPerson) => {
    return axios.post(baseUrl, newPerson)
    .then(response => response.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
    .then(response => response.data)
}

const updateNumber = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
    .then(response => response.data)
}

const peopleService = {
    getAll,
    create,
    deletePerson,
    updateNumber
  };
  
  export default peopleService;

