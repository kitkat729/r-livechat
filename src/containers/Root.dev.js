import React from 'react'
import SubApp from './SubApp'

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

const win2 = {
   sender: {
      id: '456',
      name: 'Rob'    
  },
  recipient: {
      id: '123',
      name: 'Laura'    
  } 
}

const Root = () => (
    <div className="flex-container chat-app">
      <SubApp session={win1} />
      <SubApp session={win2} />
    </div>
  )

export default Root