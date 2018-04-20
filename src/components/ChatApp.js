import React from 'react'
import { PropTypes } from 'prop-types'
import '../App.css'
import ChatPane from '../containers/ChatPane'

const ChatApp = ({chatSession}) => {
  return (
      <div id={'appuser-'+chatSession.sender.id} className="app">
        <ChatPane session={chatSession} />
      </div>
  )
}

ChatApp.propTypes = {
  chatSession: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}

export default ChatApp