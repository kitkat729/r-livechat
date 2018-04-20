import { combineReducers } from 'redux'
import signal from './chatSignal'
import chatLog from './chatLog'

export default combineReducers({
  signal
  chatLog,
})