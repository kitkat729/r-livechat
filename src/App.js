import React, { Component } from 'react';
import './App.css';

import ChatPane from './components/ChatPane';

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      session: props.session || {}
    };
  }

  render() {
    return (
      <div className="app">
        <ChatPane session={this.state.session} />
      </div>
    );
  }
}

export default App;
