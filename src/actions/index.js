import api from '../api'
import * as types from '../constants/ActionTypes'

export const getAllContacts = () => dispatch => {
  dispatch({
    type: types.GET_ALL_CONTACTS,
    payload: api.getAllContacts()
  })
}
