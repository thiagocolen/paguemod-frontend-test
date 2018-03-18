import * as types from '../constants/ActionTypes'

const initialState = {
  contactList: [],
  newContact: {
    userInfo: {},
    address: {}
  },
  newContactAddedMessage: ''
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
        newContact: {
          userInfo: {},
          address: {}
        },
        newContactAddedMessage: 'FULFILLED'
      } 

    case `${types.ADD_CONTACT}_PENDING`:
      return {
        ...state,
        newContactAddedMessage: 'PENDING'
      } 

    case `${types.DELETE_CONTACT}_FULFILLED`:
      return {
        ...state,
        contactList: action.payload
      }
      
    case types.NEW_CONTACT_USER_INFO: 
      return {
        ...state,
        newContact: {
          ...state.newContact,
          userInfo: action.payload
        }
      }

    case types.NEW_CONTACT_ADDRESS: 
      return {
        ...state,
        newContact: {
          ...state.newContact,
          address: action.payload
        },
        newContactAddedMessage: 'ADDRESS_ADDED'        
      }

    case types.NEW_CONTACT_CANCEL:
      return {
        ...state,
        newContact: {
          userInfo: {},
          address: {}
        }
      }

    case types.CLEAR_NEW_CONTACT_ADDED_MESSAGE:
      return {
        ...state,
        newContactAddedMessage: ''
      }
 
    default:
      return state
  }
}
 
export default contactsReducer
