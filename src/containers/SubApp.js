import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducers from '../reducers'
import App from './App'

class SubApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(rootReducers)
  }

  render() {
    return (
      <Provider store={this.store}>
        <App session={this.props.session} />
      </Provider>
    )
  }
}

export default SubApp