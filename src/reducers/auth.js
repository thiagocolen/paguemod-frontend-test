import * as types from '../constants/ActionTypes'

const initialState = {  
  auth: {
    username: '',
    password: ''
  },
  baseURL: 'https://cors-anywhere.herokuapp.com/https://paguemob-interview-environment.firebaseapp.com',
  headers: { 'Content-Type': 'application/json' }
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {

    case types.SET_USER_DATA:
      return {
        ...state,
        auth: action.payload
      }

    default:
      return state
  }
}
 
export default authReducer
