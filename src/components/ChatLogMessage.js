import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ChatLogMessage = ({ message, onMouseOver }) => {
  let logMessageClassNames = ['flex-container', 'log-message']
  let userInitial

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

  return (
    <div className={classNames(logMessageClassNames)}>
      <span className="avatar">{userInitial}</span>
      <span className={message.type}>
        <time dateTime={message.timestamp} onMouseOver={onMouseOver}>{message.value}</time>
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