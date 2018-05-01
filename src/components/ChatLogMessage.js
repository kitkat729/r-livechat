import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

function getImage(message) {
  return (
    <img alt="" src={message.value} />
  )
}

const ChatLogMessage = ({ message, onMouseOver }) => {
  let logMessageClassNames = ['flex-container', 'log-message']
  let userInitial, messageType, messageValue

  switch (message.status) {
    case 'sending':
      logMessageClassNames.push('message-sending')
      userInitial = message.from.charAt(0)
      break
    case 'sent':
      logMessageClassNames.push('message-sent')
      userInitial = message.from.charAt(0)
      break
    case 'received':
    default:
      logMessageClassNames.push('message-received')
      userInitial = message.from.charAt(0)
  }

  switch (message.type) {
    case 'media.image':
      messageType = 'image'
      messageValue = getImage(message)
      break
    default:
      messageType = message.type
      messageValue = message.value
  }
  return (
    <div className={classNames(logMessageClassNames)}>
      <span className="avatar">{userInitial}</span>
      <span className={messageType}>
        <time dateTime={message.timestamp} onMouseOver={onMouseOver}>{messageValue}</time>
      </span>
    </div>    
  )
}

ChatLogMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  }).isRequired,
  onMouseOver: PropTypes.func
}

export default ChatLogMessage