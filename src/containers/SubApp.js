import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from '../reducers'
import App from './App'

import {
  createChatApp
} from '../actions'

const SubApp = (props) => {
  const store = createStore(rootReducers)
  
  store.dispatch(createChatApp(props.session))
  
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

export default SubApp