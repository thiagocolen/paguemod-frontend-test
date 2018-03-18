import * as types from '../constants/ActionTypes'

const initialState = {
  contactList: []
}

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {

    case `${types.GET_ALL_CONTACTS}_FULFILLED`:
      return {
        ...state,
        contactList: action.payload
      } 

    case `${types.EDIT_CONTACT}_FULFILLED`:
      return {
        ...state,
        contactList: action.payload
      } 

    case `${types.ADD_CONTACT}_FULFILLED`:
      return {
        ...state,
        contactList: action.payload
      } 

    case `${types.DELETE_CONTACT}_FULFILLED`:
      return {
        ...state,
        contactList: action.payload
      } 

    default:
      return state
  }
}
 
export default contactsReducer
