import * as types from '../constants/ActionTypes'

const initialState = {
  contactList: [],
  apiResponse: '',
  pessoa: '',
  contact: {
    name: '',
    cpf: '',
    cnpj: '',
    gender: '',
    website: '',
    email: '',
    telephone: '',
    streetName: '',
    streetNumber: '',
    neighborhood: '',
    complement: '',
    zip: '',
    city: '',
    state: '',
    country: ''       
  }
}

const updateContactToForm = (state, payload) => {

  if (payload.prop === 'pessoa') {
    return {
      ...state,
      [payload.prop]: payload.newValue 
    }
  }
  
  return {
    ...state,
    contact: {
      ...state.contact,
      [payload.prop]: payload.newValue
    }
  }
}

const clearContact = (state, payload) => {
  return {
    ...state,
    apiResponse: '',
    pessoa: '',
    contact: {
      name: '',
      cpf: '',
      cnpj: '',
      gender: '',
      website: '',
      email: '',
      telephone: '',
      streetName: '',
      streetNumber: '',
      neighborhood: '',
      complement: '',
      zip: '',
      city: '',
      state: '',
      country: '' 
    }
  }
}

const addContactOnState = (state, payload) => {

  let contact = {
    name: payload.userInfo.name,
    cpf: payload.userInfo.cpf,
    cnpj: payload.userInfo.cnpj,
    gender: payload.userInfo.gender,
    website: payload.userInfo.website,
    email: payload.userInfo.email,
    telephone: payload.userInfo.telephone,
    streetName: payload.address.streetName,
    streetNumber: payload.address.streetNumber.toString(),
    neighborhood: payload.address.neighborhood,
    complement: payload.address.complement,
    zip: payload.address.zip,
    city: payload.address.city,
    state: payload.address.state,
    country: payload.address.country
  }

  if (payload.userInfo.cpf) {
    return {
      ...state,
      contact: contact,
      pessoa: 'pf'
    }
  }

  if (payload.userInfo.cnpj) {
    return {
      ...state,
      contact: contact,
      pessoa: 'pj'
    }
  }

}

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {

    case `${types.GET_ALL_CONTACTS}_FULFILLED`:
      return {
        ...state,
        contactList: action.payload
      }
      
    case `${types.GET_CONTACT}_FULFILLED`:
      return addContactOnState(state, action.payload)
      
    case `${types.ADD_CONTACT}_FULFILLED`:
      return {
        ...state,
        apiResponse: action.payload
      }

    case `${types.EDIT_CONTACT}_FULFILLED`:
      return {
        ...state,
        apiResponse: action.payload
      }
      
    case types.UPDATE_CONTACT_FORM: 
      return updateContactToForm(state, action.payload)

    case types.CLEAR_CONTACT_FORM:
      return clearContact(state)

    default:
      return state
  }
}
 
export default contactsReducer
