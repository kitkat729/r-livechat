import {
  CHATLOG_ADD_SIGNAL,
  CHATLOG_REMOVE_SIGNAL
} from '../constants/actionTypes'

const signal = (state = null, action) => {
  switch (action.type) {
    case CHATLOG_ADD_SIGNAL:
      return action.message
    case CHATLOG_REMOVE_SIGNAL:
      return null
    default:
      return state
  }  
}

export default signal