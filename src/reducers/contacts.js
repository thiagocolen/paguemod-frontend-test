
const initialState = {}

const contacts = (state = initialState, action) => {
  switch (action.type) {
    case 'ACTION_TESTE':
      return {
        ...state
      } 
    default:
      return state
  }
}
 
export default contacts
