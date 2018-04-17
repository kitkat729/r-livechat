import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
// import ChatMessage from './ChatMessage'

class ChatLog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      log: [],
      signal: null
    }
console.log('chat log constructor=%o', this.props.message);
    if (this.props.message) {
      switch (this.props.message.type) {
        case 'signal':
          this.state.signal = this.props.message.value;

          // Self destruct signal
          // @todo refactor this later
          // let ms = 3000;
          // let wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
          // (async () => { await wait(ms); this.setState({signal: null}) })()
          break;
        default:
          this.state.log.push(this.props.message);
          //this.addMessage(this.props.message);
      }
    }
  }

  addMessage(message) {
    //this.state.log.push()
  }

  scrollToBottom() {

  }

  render() {
    let list = this.state.log.map( message => {
      return <ChatLogMessage key={message.id} message={message} />
    })
console.log('chat log render');
console.log(this.props.message);
    let signal = '';
    if (!this.state.signal && this.props.message) {
      signal = <ChatLogMessage key={this.props.message.id} message={this.props.message} />


console.log('add signal');
    }

    return (
      <div className="chat-log hide-scrollbar">
        <div className="chat-log-messages">{list}</div>
        <div className="chat-log-signal">{signal}</div>
      </div>
    )    
  }
}

function ChatLogMessage(props) {
  let logMessageClassNames = ['flex-container', 'log-message'];
  let isOwner = props.message.from === props.message.owner ? true : false;
  let userInitial = isOwner ? props.message.owner.charAt(0) : props.message.from.charAt(0);
  logMessageClassNames.push(isOwner ? 'message-sent' : 'message-received');

  return (
    <div className={classNames(logMessageClassNames)}>
      <span className="avatar">{userInitial.toUpperCase()}</span>
      <span className={props.message.type}>
        <time dateTime={props.message.timestamp} onMouseOver={ (e) => {
        e.target.setAttribute('title', moment.utc(e.target.getAttribute('datetime'), "YYYY-MM-DDTHH:mm:ss").fromNow());
      }}>{props.message.value}</time>
      </span>
    </div>
  )
}
export default ChatLog;