import * as types from '../constants/actionTypes'

export const createChatApp = session => ({
  type: types.CHAT_CREATE_APP,
  session
})

export const addChatMessage = message => ({
    type: types.CHATLOG_ADD_MESSAGE,
    message
})

export const addChatSignal = message => ({
    type: types.CHATLOG_ADD_SIGNAL,
    message
})

export const removeChatSignal = () => ({
    type: types.CHATLOG_REMOVE_SIGNAL
})