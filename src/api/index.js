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





class Api {

  static getAllContacts () {
    return new Promise((resolve, reject) => {
      myAxios.get('/contacts')
        .then((response) => {
          resolve(response.data) 
        })   
        .catch((error) => {
          reject(error)
        })
    }) 
  }

  static postContact (contact) {
    return new Promise((resolve, reject) => {
      myAxios.post('/contacts', contact)
        .then(() => {
          this.getAllContacts().then(response => {
            resolve(response)
          })  
        })
        .catch((error) => {
          reject(error)
        })
    })
  }  

  static putContact (contact, contactId) {
    return new Promise((resolve, reject) => {
      myAxios.put('/contacts/' + contactId, contact)
        .then(() => {
          this.getAllContacts().then(response => {
            resolve(response)
          }) 
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static deleteContact (contactId) {
    return new Promise((resolve, reject) => {
      myAxios.delete('/contacts/' + contactId)
        .then(() => {
          this.getAllContacts().then(response => {
            resolve(response)
          }) 
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

}

export default Api