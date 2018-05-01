import {
  CHATLOG_ADD_MESSAGE,
  CHATLOG_UPDATE_MESSAGE
} from '../constants/actionTypes'

const chatLog = (state = [], action) => {
  switch (action.type) {
    case CHATLOG_ADD_MESSAGE:
      return [...state, action.message]
    case CHATLOG_UPDATE_MESSAGE:
      return state.map(message => ( message.id === action.message.id ? action.message : message))
    default:
      return state
  }
}

export default chatLog