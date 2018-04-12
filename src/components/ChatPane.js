import React from 'react';

class ChatPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      log: [],
      inputText: ''
    }
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleInputTextSubmit = this.handleInputTextSubmit.bind(this);
  }

  handleInputTextChange (e) {
    this.setState({inputText: e.target.value});
  }

  handleInputTextSubmit (e) {
    if (this.state.inputText === '') {
      return;
    }

    this.inputTextSubmit();
  }

  inputTextSubmit() {
    // submit to server
    var message = {
      type: 'text',
      value: this.state.inputText,
      from: this.props.user.id,
      to: 'party id',
      id: null,
      timestamp: null
    }

    let submit = new Promise((resolve, reject) => {
      console.log('submit=', message);

      // this should be returned from the server
      var resp = {
        id: 'asldfjalsd', // message id
        timestamp: 'timestamp', // message timestamp
      }

      resolve(resp);
    });

    submit.then(resp => {
      message.id = resp.id;
      message.time = resp.timestamp;

      this.state.log.push(message);
      this.setState({
        log: this.state.log,
        inputText: ''
      });

    });
  }

  render() {
    return (
      <div className="chat-pane">
        <ChatLog log={this.state.log} />
        <div className="chat-input">
          <input type="text" className="chat-input-text" placeholder='Type...' value={this.state.inputText} onChange={this.handleInputTextChange} />
          <button type="button" className="chat-input-text-submit" onClick={this.handleInputTextSubmit}>Send</button>
        </div>
      </div>
    )
  }
}

function ChatLog(props) {
  let list = props.log.map( message => {
    return <ChatLogMessage key={message.id} message={message} />
  })

  return <div className="chat-log">{list}</div>
}

function ChatLogMessage(props) {
  let logMessageClassName = "chat-log-message " + props.message.type;

  return (
    <div className={logMessageClassName} title={props.message.time}>
      <span className="sender">{props.message.from}</span>: {props.message.value}
    </div>
  )
}

export default ChatPane;