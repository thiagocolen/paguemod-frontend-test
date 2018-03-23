import { combineReducers } from 'redux'
import contactsReducer from './contacts'
import authReducer from './auth'
 
export default combineReducers({
  contactsReducer,
  authReducer
})
