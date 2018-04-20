import {
  CHATLOG_ADD_MESSAGE
} from '../constants/actionTypes'

const chatLog = (state = [], action) => {
  switch (action.type) {
    case CHATLOG_ADD_MESSAGE:
      return [...state, action.message]
    default:
      return state
  }
}

export default chatLog