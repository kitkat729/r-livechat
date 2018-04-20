import { combineReducers } from 'redux'
import chatApp from './chatApp'
import chatLog from './chatLog'
import chatSignal from './chatSignal'

export default combineReducers({
  chatApp,
  chatLog,
  chatSignal
})