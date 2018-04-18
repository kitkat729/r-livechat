import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { main } from '../reducers/main'
import { App } from './App'

class SubApp extends Component {
  constructor(props) {
    super(props)
    this.store = createStore(main);
  }

  render() {
    return (
      <Provider store={this.store}>
        <App session={this.props.session} />
      </Provider>
    )
  }
}