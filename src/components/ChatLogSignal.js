import React from 'react'
import PropTypes from 'prop-types'
import ChatLogMessage from './ChatLogMessage'

const ChatLogSignal = ({signal}) => {
  let message = signal ? <ChatLogMessage key={signal.id} message={signal} /> : ''
  return (
    <div className="chat-log-signal">{message}</div>
  )
}

ChatLogMessage.propTypes = {
  signal: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    owner: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired
  })
}

export default ChatLogSignal