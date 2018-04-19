import React from 'react'
import PropTypes from 'prop-types'
import ChatLogMessage from './ChatLogMessage'

const ChatLogSignal = ({ signal, destroy } ) => {
  if (signal && destroy) {
    let ms = 3000;
    //console.log('signal will be self-destroyed in '+(ms/1000)+' seconds')
    let wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
    (async () => { await wait(ms); /*console.log('self-destroying signal');*/ destroy() })()
  }

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
  }),
  destroy: PropTypes.func
}

export default ChatLogSignal