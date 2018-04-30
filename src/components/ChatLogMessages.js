import React from 'react';
import { PropTypes } from 'prop-types'
import ChatLogMessage from './ChatLogMessage'
import moment from 'moment'

const ChatLogMessages = ({chatLog}) => {
  let list = chatLog.map( message => {
    return <ChatLogMessage key={message.id} message={message} onMouseOver={ (e) => {
      e.target.setAttribute('title', moment.utc(e.target.getAttribute('datetime'), "YYYY-MM-DDTHH:mm:ss").fromNow());
    }} />
  })

  return (
    <div className="chat-log-messages">{list}</div>
  ) 
}

ChatLogMessages.propTypes = {
  chatLog: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
      timestamp: PropTypes.string.isRequired
    }).isRequired
  ).isRequired
}
export default ChatLogMessages;