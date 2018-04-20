import { combineReducers } from 'redux'
import chatLog from './chatLog'
import chatSignal from './chatSignal'

export default combineReducers({
  chatLog,
  chatSignal
})