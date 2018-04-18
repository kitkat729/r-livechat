import { combineReducers } from 'redux'
import log from './chatLog'
import signal from './chatSignal'

export default combineReducers({
  log,
  signal
})