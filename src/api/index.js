import axios from 'axios'

var myAxios = axios.create({
  auth: {
    username: 'thiago.souzacolen@gmail.com',
    password: 'paguemob249'
  },
  baseURL: 'https://cors-anywhere.herokuapp.com/https://paguemob-interview-environment.firebaseapp.com',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {

  getAllContacts: () => {
    return new Promise((resolve, reject) => {
      myAxios.get('/contacts')
        .then(function (response) {
          resolve(response.data) 
        })
        .catch(function (error) {
          reject(error)
        })
    }) 
  },

  postContact: (contact) => {
    return new Promise((resolve, reject) => {
      myAxios.post('/contacts', contact)
        .then(function (response) {
          resolve(response.data) 
        })
        .catch(function (error) {
          reject(error)
        })
    })
  }

}
