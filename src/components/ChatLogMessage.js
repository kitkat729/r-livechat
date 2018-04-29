import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ChatLogMessage = ({ message, onMouseOver }) => {
  let logMessageClassNames = ['flex-container', 'log-message']
  let isOwner = message.from === message.owner ? true : false
  let userInitial = isOwner ? message.owner.charAt(0) : message.from.charAt(0)

  switch (message.status) {
    case 'sending':
      logMessageClassNames.push('message-sending')
      break
    case 'sent':
      logMessageClassNames.push('message-sent')
      break
    case 'received':
    default:
      logMessageClassNames.push('message-received')
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
    owner: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  }).isRequired,
  onMouseOver: PropTypes.func
}

export default ChatLogMessage