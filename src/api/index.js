import axios from 'axios'

class Api {

  // Esta paginação pela API não está sendo usada porque eu precisaria
  // do meta dado 'total de registros' na resposta da API para poder
  // calcular o número total de páginas, então estou fazendo 
  // uma paginção apenas no front-end 
  static getAllContacts (auth, sizePerPage, page) {
    return new Promise((resolve, reject) => {
      axios.get(`/contacts?page=${page}&size=${sizePerPage}`, auth)
        .then((response) => {
          resolve(response.data) 
        })
        .catch((error) => {
          reject(error)
        })
    }) 
  }

  static getContact (auth, id) {
    return new Promise((resolve, reject) => {
      axios.get(`/contacts`, auth)
        .then((response) => {
          let selectedContact = response.data.filter(item => {
            return item.id === id
          })
          resolve(selectedContact[0]) 
        })
        .catch((error) => {
          reject(error)
        })
    }) 
  }

  static postContact (contact, auth) {
    return new Promise((resolve, reject) => {
      axios.post('/contacts', contact, auth)
        .then((res) => {
          resolve(res.statusText)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }  

  static putContact (contact, contactId, auth) {
    return new Promise((resolve, reject) => {
      axios.put('/contacts/' + contactId, contact, auth)
        .then((res) => {
          resolve(res.statusText)
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