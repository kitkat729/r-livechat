import { * as Actions } from '../actions'
import { merge } from 'lodash/merge'
import { combineReducers } from 'redux'

function signal(state = null, action) {
  switch (action.type) {
    case CHATLOG_ADD_SIGNAL:
      return merge({}, state, { signal: action.message })
    case CHATLOG_REMOVE_SIGNAL:
      return merge({}, state, { signal: null })
    default:
      return state
  }  
}

function log(state = [], action) {
  switch (action.type) {
    case CHATLOG_ADD_MESSAGE:
      return merge({}, state, [...state, action.message])
    default:
      return state
  }
}

const chatLog = combineReducers({
  signal,
  log
})

export default chatLog