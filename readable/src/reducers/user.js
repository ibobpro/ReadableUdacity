import {CHANGE_USER} from '../actions/constants'


const initialState = {user:'iBobPro'}

function user (state = initialState, action ) {
  const {user} = action;
  switch (action.type) {
    case CHANGE_USER:
      return user
    default:
      return state
  }
}

export default user
