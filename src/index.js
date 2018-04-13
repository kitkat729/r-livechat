import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var win1 = {
  sender: {
    id: '123',
    name: 'Laura'
  },
  recipient: {
    id: '456',
    name: 'Rob'
  }
}

var win2 = {
   sender: {
      id: '456',
      name: 'Rob'    
  },
  recipient: {
      id: '123',
      name: 'Laura'    
  } 
}

ReactDOM.render(
    <div className="chat-app">
      <App session={win1} />
      <App session={win2} />
    </div>, document.getElementById('root'));

registerServiceWorker();
