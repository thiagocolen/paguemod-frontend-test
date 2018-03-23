import axios from 'axios'



class Api {

  static getAllContacts (auth) {
    return new Promise((resolve, reject) => {
      axios.get('/contacts', auth)
        .then((response) => {
          resolve(response.data) 
        })
        .catch((error) => {
          reject(error)
        })
    }) 
  }

  static postContact (contact, auth) {
    return new Promise((resolve, reject) => {
      axios.post('/contacts', contact, auth)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }  

  static putContact (contact, contactId, auth) {
    return new Promise((resolve, reject) => {
      axios.put('/contacts/' + contactId, contact, auth)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  static deleteContact (contactId, auth) {
    return new Promise((resolve, reject) => {
      axios.delete('/contacts/' + contactId, auth)
        .then(() => {
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

}

export default Api