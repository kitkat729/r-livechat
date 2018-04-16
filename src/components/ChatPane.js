import React from 'react';
import moment from 'moment';
import PubSub from 'pubsub-js';

class ChatPane extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      log: [],
      logSignal: null,
      inputText: '',
      inputTextTyping: false,
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

    // Typing signal: send signal and pause X second before resuming the next signal
    if (!this.state.inputTextTyping) {
      const message = ['signal', 'typing', this.props.session.sender.name, this.props.session.recipient.name];
      
      this.submit(this.getNewMessage(...message))
      .then(resp => {
        this.setState({inputTextTyping: true});
        let ms = 2000;
        let wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
        (async () => { await wait(ms); this.setState({inputTextTyping: false}) })()
      });
    }
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

    switch (message.type) {
      case 'text':
        message.timestamp = moment.utc().format(); // 2018-04-12T02:47:07
        message.owner = (message.from === this.props.session.sender.name) ? message.from : message.to;
        message.id = message.owner + '-' + moment().valueOf();

        this.state.log.push(message);
        this.setState({
          log: this.state.log,
          inputText: ''
        });
        break;
      case 'signal':
        if (!this.state.logSignal && message.from !== this.props.session.sender.name) {
          //console.log('add signal to ' + this.props.session.sender.name + ' chat pane');

          message.owner = (message.from === this.props.session.sender.name) ? message.from : message.to;
          message.id = message.owner + '-' + moment().valueOf();
          
          switch (message.value) {
            case 'typing':
              message.value = '...';
              break;
            default:
              message.value = '';
          }

          this.setState({
            logSignal: message
          });

          // Self destruct signal
          // @todo refactor this later
          let ms = 3000;
          let wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
          (async () => { await wait(ms); this.setState({logSignal: null}) })()
        }
        break;
      default:
    }
  }

  submit(message) {
    return new Promise((resolve, reject) => {
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
      <section className="chat-pane">
        <div className="chat-header">
          <div className="chat-header-title">{this.props.session.recipient.name}</div>
        </div>
        <ChatLog log={this.state.log} signal={this.state.logSignal}/>
        <div className="chat-input design1">
          <textarea type="text" className="chat-input-text" autoFocus="true" rows="auto" placeholder='Type...' value={this.state.inputText} onChange={this.handleInputTextChange} />
          <button type="button" className="chat-input-text-submit" onClick={this.handleInputTextSubmit}>Send</button>
        </div>
      </section>
    )
  }
}

function ChatLog(props) {
  let list = props.log.map( message => {
    return <ChatLogMessage key={message.id} message={message} />
  })

  let signal = '';
  if (props.signal) {
    signal = <ChatLogMessage key={props.signal.id} message={props.signal} />
  }

  return (
    <div className="chat-log">
      <div className="chat-log-messages">{list}</div>
      <div className="chat-log-signal">{signal}</div>
    </div>
  )
}

function ChatLogMessage(props) {
  let logMessageClassName = ['flex-container log-message'];
  let isOwner = props.message.from === props.message.owner ? true : false;
  let userInitial = isOwner ? props.message.owner.charAt(0) : props.message.from.charAt(0);
  logMessageClassName.push(isOwner ? 'message-sent' : 'message-received');

  return (
    <div className={logMessageClassName.join(' ')}>
      <span className="avatar">{userInitial.toUpperCase()}</span>
      <span className={props.message.type}>
        <time dateTime={props.message.timestamp} onMouseOver={ (e) => {
        e.target.setAttribute('title', moment.utc(e.target.getAttribute('datetime'), "YYYY-MM-DDTHH:mm:ss").fromNow());
      }}>{props.message.value}</time>
      </span>
    </div>
  )
}

export default ChatPane;