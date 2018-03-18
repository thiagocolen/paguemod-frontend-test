import api from '../api'
import * as types from '../constants/ActionTypes'

export const getAllContacts = () => dispatch => {
  dispatch({
    type: types.GET_ALL_CONTACTS,
    payload: api.getAllContacts()
  })
}

export const addContact = (contact) => dispatch => {
  dispatch({
    type: types.ADD_CONTACT,
    payload: api.postContact(contact)
  })
}

export const editContact = (contact, contactId) => dispatch => {
  dispatch({
    type: types.EDIT_CONTACT,
    payload: api.putContact(contact, contactId)
  })
}

export const deleteContact = (contactId) => dispatch => {
  dispatch({
    type: types.DELETE_CONTACT,
    payload: api.deleteContact(contactId)
  })
}
