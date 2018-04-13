import React from 'react';
import moment from 'moment';
import PubSub from 'pubsub-js';

class ChatPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      log: [],
      inputText: '',
      token: null,
      channel: ''
    }
    
    this.handleInputTextChange = this.handleInputTextChange.bind(this);
    this.handleInputTextSubmit = this.handleInputTextSubmit.bind(this);
    this.handleInputTextKeyPress = this.handleInputTextKeyPress.bind(this);

    if (this.props.session) {
      // build a unique channel name (based on unique id) that will be same every time across all users
      this.state.channel = (this.props.session.sender.id < this.props.session.recipient.id) ?
                              this.props.session.sender.id + this.props.session.recipient.id :
                              this.props.session.recipient.id + this.props.session.sender.id;

      this.state.token = PubSub.subscribe(this.state.channel, this.subscriber.bind(this));
    }
  }

  componentWillUnmount() {
    !this.state.token || PubSub.unsubscribe(this.state.token);
  }

  handleInputTextChange (e) {
    this.setState({inputText: e.target.value});
  }

  handleInputTextKeyPress (e) {
    if (e.key === "Enter") {
      this.inputTextSubmit();
    }
  }

  handleInputTextSubmit (e) {
    if (this.state.inputText === '') {
      return;
    }

    this.inputTextSubmit();
  }

  subscriber(channel, data) {
    let message = JSON.parse(data);
    message.timestamp = moment.utc().format(); // 2018-04-12T02:47:07
    message.owner = (message.from === this.props.session.sender.name) ? message.from : message.to;
    message.id = message.owner + '-' + message.timestamp;

    this.state.log.push(message);
    this.setState({
      log: this.state.log,
      inputText: ''
    });
  }

  submit(message) {
    return new Promise((resolve, reject) => {
        console.log('submit=', message);

        if (PubSub.publish(this.state.channel, JSON.stringify(message))) {
          resolve(true);
        }
        else {
          reject('Server did not response')
        }
      });
  }

  getNewMessage(type: 'text', value, from, to) {
    return {
      type: type,
      value: value,
      from: from,
      to: to,
    }
  }

  inputTextSubmit() {
    const message = ['text', this.state.inputText, this.props.session.sender.name, this.props.session.recipient.name];

    this.submit(this.getNewMessage(...message))
    .then(resp => {

    })
    .catch(err => {
      console.log('Message was not sent. Error:', err);
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
  let logMessageClassName = [props.message.type];
  logMessageClassName.push(props.message.from === props.message.owner ? 'text-sent' : 'text-received');

  return (
    <div className={logMessageClassName.join(' ')}>
      <span className="avatar"></span>
      <time dateTime={props.message.timestamp} onMouseOver={ (e) => {
        e.target.setAttribute('title', moment.utc(e.target.getAttribute('datetime'), "YYYY-MM-DDTHH:mm:ss").fromNow());
      }}>{props.message.value}</time>
    </div>
  )
}

export default ChatPane;