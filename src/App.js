import React, { Component } from 'react';
import './App.css';

import ChatPane from './components/ChatPane'

class App extends Component {
  constructor (props) {
    super(props);

    this.user = {
      id: '123',
      name: 'Laura'
    }
  }

  render() {
    return (
      <div className="App">
        <ChatPane user={this.user}/>
      </div>
    );
  }
}

export default App;
