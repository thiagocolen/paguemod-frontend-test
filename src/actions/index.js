import api from '../api'
import * as types from '../constants/ActionTypes'

export const getAllContacts = () => dispatch => {
  dispatch({
    type: types.GET_ALL_CONTACTS,
    payload: api.getAllContacts()
  })
}

export const addSelectedContactToForm = (selectedContact) => dispatch => {
  dispatch({
    type: types.ADD_SELECTED_CONTACT_TO_FORM,
    payload: selectedContact
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

export const newContactUserInfo = (contactUserInfo) => dispatch => {
  dispatch({
    type: types.NEW_CONTACT_USER_INFO,
    payload: contactUserInfo
  })
}

export const newContactAddress = (contactAddress) => dispatch => {
  dispatch({
    type: types.NEW_CONTACT_ADDRESS,
    payload: contactAddress
  })
}

export const newContactCancel = () => dispatch => {
  dispatch({
    type: types.NEW_CONTACT_CANCEL,
    payload: null
  })
}

export const clearNewContactAddedMessage = () => dispatch => {
  dispatch({
    type: types.CLEAR_NEW_CONTACT_ADDED_MESSAGE,
    payload: null
  })
}

