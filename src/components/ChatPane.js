import React from 'react';
import moment from 'moment';

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
    }

    let submit = new Promise((resolve, reject) => {
      console.log('submit=', message);

      var serverResp = {
        //id: 'asldfjalsd', // @todo figure out if a server message id is needed
        timestamp: moment.utc().format()  // 2018-04-12T02:47:07
      }

      resolve(serverResp);
    });

    submit.then(resp => {
      message.id = ((message.from == this.props.user.id) ? message.from : message.to) + '-' + resp.timestamp;
      message.timestamp = resp.timestamp;

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
    <div className={logMessageClassName}>
      <span className="sender">{props.message.from}</span>: <time dateTime={props.message.timestamp} onMouseOver={ (e) => {
        e.target.setAttribute('title', moment.utc(e.target.getAttribute('datetime'), "YYYY-MM-DDTHH:mm:ss").fromNow());
      }}>{props.message.value}</time>
    </div>
  )
}

export default ChatPane;