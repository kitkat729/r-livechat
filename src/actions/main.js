export const CHATLOG_ADD_MESSAGE = 'CHATLOG_ADD_MESSAGE'
export const CHATLOG_ADD_SIGNAL = 'CHATLOG_ADD_SIGNAL'
export const CHATLOG_REMOVE_SIGNAL = 'CHATL0G_REMOVE_SIGNAL'

export const addChatMessage = message => {
  return {
    type: CHATLOG_ADD_MESSAGE,
    message: message
  }
}

export const addChatSignal = message => {
  return {
    type: CHATLOG_ADD_SIGNAL,
    message: message
  }
}

export const removeChatSignal = () => {
  return {
    type: CHATLOG_REMOVE_SIGNAL
  }
}