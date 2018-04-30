import React from 'react';
import ReactDOM from 'react-dom';
import SubApp from './containers/SubApp';

it('renders without crashing', () => {
  const win1 = {
    sender: {
      id: '123',
      name: 'Laura'
    },
    recipient: {
      id: '456',
      name: 'Rob'
    }
  }

  const div = document.createElement('div');
  ReactDOM.render(<SubApp session={win1} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
