import api from '../api'
import * as types from '../constants/ActionTypes'

export const getAllContacts = (auth, sizePerPage, page) => dispatch => {
  dispatch({
    type: types.GET_ALL_CONTACTS,
    payload: api.getAllContacts(auth, sizePerPage, page)
  })
}

export const getContact = (auth, id) => dispatch => {
  dispatch({
    type: types.GET_CONTACT,
    payload: api.getContact(auth, id)
  })
}

export const addContact = (contact, auth) => dispatch => (
  dispatch({
    type: types.ADD_CONTACT,
    payload: api.postContact(contact, auth)
  })
)

export const editContact = (contact, contactId, auth) => dispatch => (
  dispatch({
    type: types.EDIT_CONTACT,
    payload: api.putContact(contact, contactId, auth)
  })
)

export const deleteContact = (contactId, auth) => dispatch => (
  dispatch({
    type: types.DELETE_CONTACT,
    payload: api.deleteContact(contactId, auth)
  })
)

export const addSelectedContactToForm = (selectedContact) => dispatch => {
  dispatch({
    type: types.FILL_CONTACT_FORM,
    payload: selectedContact
  })
}

export const updateContactToForm = (prop, newValue) => dispatch => {
  dispatch({
    type: types.UPDATE_CONTACT_FORM,
    payload: {
      prop: prop,
      newValue: newValue
    }
  })
}

export const clearContactForm = () => dispatch => {
  dispatch({
    type: types.CLEAR_CONTACT_FORM,
    payload: null
  })
}

export const setUserData = (username, password) => dispatch => {
  dispatch({
    type: types.SET_USER_DATA,
    payload: {
      username: username,
      password: password
    }
  })
}

