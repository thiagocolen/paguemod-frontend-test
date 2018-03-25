import * as types from '../constants/ActionTypes'

const initialState = {
  contactList: [],
  newContact: {
    userInfo: {},
    address: {
      streetName: '',
      streetNumber: null,
      neighborhood: '',
      complement: '',
      zip: '',
      city: '',
      state: '',
      country: ''       
    }
  },
  newContactAddedMessage: ''
}

const newContactUserInfo = (state, payload) => {
  console.log('newContactUserInfo', payload)
  if (payload.pessoa === 'pf') {
    return {
      ...state,
      newContact: {
        ...state.newContact,
        userInfo: {
          name: payload.userInfo.name,
          cpf: payload.userInfo.cpf,
          gender: payload.userInfo.gender,
          email: payload.userInfo.email,
          telephone: payload.userInfo.telephone 
        }
      }
    }
  }

  if (payload.pessoa === 'pj') {
    return {
      ...state,
      newContact: {
        ...state.newContact,
        userInfo: {
          name: payload.userInfo.name,
          cnpj: payload.userInfo.cnpj,
          website: payload.userInfo.website,
          email: payload.userInfo.email,
          telephone: payload.userInfo.telephone 
        }
      }
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

    case `${types.EDIT_CONTACT}_FULFILLED`:
      return {
        ...state,
        newContact: {
          userInfo: {},
          address: {}
        },
        newContactAddedMessage: 'FULFILLED'
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
        newContactAddedMessage: 'DELETED_CONTACT'
      }
      
    case types.NEW_CONTACT_USER_INFO: 
      return newContactUserInfo(state, action.payload)

    case types.NEW_CONTACT_ADDRESS: 
      return {
        ...state,
        newContact: {
          ...state.newContact,
          address: {
            streetName: action.payload.streetName,
            streetNumber: Number(action.payload.streetNumber),
            neighborhood: action.payload.neighborhood,
            complement: action.payload.complement,
            zip: action.payload.zip,
            city: action.payload.city,
            state: action.payload.state,
            country: action.payload.country              
          }
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

    case types.ADD_SELECTED_CONTACT_TO_FORM:
      return {
        ...state,
        newContact: action.payload
      }

    case `${types.GET_ADDRESS_BY_CEP}_FULFILLED`:
      return {
        ...state,
        newContact: {
          ...state.newContact,
          address: {
            ...state.newContact.address,
            streetName: action.payload.logradouro,
            neighborhood: action.payload.bairro,
            zip: action.payload.cep,
            city: action.payload.localidade,
            state: action.payload.uf,
            country: 'Brasil'       
          }        
        }
      }

    default:
      return state
  }
}
 
export default contactsReducer
