import React, { Component } from 'react'
import moment from 'moment'
import PubSub from 'pubsub-js'

import ChatLog from './ChatLog'
import ChatSignal from './ChatSignal'

import { connect } from 'react-redux'
import {
  addChatMessage,
  addChatSignal,
  removeChatSignal
} from '../actions'

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => ({
  onReceiveMessage: message => {
    dispatch(addChatMessage(message))
  },
  onReceiveSignal: message => {
    dispatch(addChatSignal(message))
  },
  onDestroySignal: () => {
    dispatch(removeChatSignal())
  }
})

class ChatPane extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      inputText: '',
      inputTextTyping: false,
      token: null,
      channel: ''
    }
    
    this.handleInputTextChange = this.handleInputTextChange.bind(this)
    this.handleInputTextSubmit = this.handleInputTextSubmit.bind(this)
    this.handleInputTextKeyPress = this.handleInputTextKeyPress.bind(this)

    if (this.props.session) {
      // build a unique channel name (based on unique id) that will be same every time across all users
      this.state.channel = (this.props.session.sender.id < this.props.session.recipient.id) ?
                              this.props.session.sender.id + this.props.session.recipient.id :
                              this.props.session.recipient.id + this.props.session.sender.id

      this.state.token = PubSub.subscribe(this.state.channel, this.subscriber.bind(this))
    }

    this.chatLogRef = React.createRef();

    this.receiveMessage = message => this.props.onReceiveMessage(message)
    this.receiveSignal = message => this.props.onReceiveSignal(message)
    this.destroySignal = () => this.props.onDestroySignal()
  }

  componentWillUnmount() {
    !this.state.token || PubSub.unsubscribe(this.state.token)
  }

  handleInputTextChange (e) {
    this.setState({inputText: e.target.value})

    // Typing signal: send signal and pause X second before resuming the next signal
    if (!this.state.inputTextTyping) {
      const message = ['signal', 'typing', this.props.session.sender.name, this.props.session.recipient.name]
      
      this.submit(this.getNewMessage(...message))
      .then(resp => {
        this.setState({inputTextTyping: true})
        let ms = 2000;
        let wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
        (async () => { await wait(ms); this.setState({inputTextTyping: false}) })()
      })
    }
  }

  handleInputTextKeyPress (e) {
    if (e.key === "Enter") {
      this.inputTextSubmit()
    }
  }

  handleInputTextSubmit (e) {
    if (this.state.inputText === '') {
      return
    }

    this.inputTextSubmit()
  }

  scrollChatLogTo(scrollTop = 0) {
    this.chatLogRef.current.scrollTop = scrollTop;
  }

  subscriber(channel, data) {
    let message = JSON.parse(data);

    switch (message.type) {
      case 'text':
        message.timestamp = moment.utc().format(); // 2018-04-12T02:47:07
        message.owner = (message.from === this.props.session.sender.name) ? message.from : message.to;
        message.id = message.owner + '-' + moment().valueOf()

        this.receiveMessage(message)
        this.scrollChatLogTo(this.chatLogRef.current.scrollHeight)

        break;
      case 'signal':
        if (message.from !== this.props.session.sender.name) {
          // console.log('add signal to ' + this.props.session.sender.name + ' chat pane');

          message.owner = (message.from === this.props.session.sender.name) ? message.from : message.to
          message.id = message.owner + '-' + moment().valueOf()
          
          switch (message.value) {
            case 'typing':
              message.value = '...'
              break
            default:
              message.value = ''
          }

          this.receiveSignal(message)
          this.scrollChatLogTo(this.chatLogRef.current.scrollHeight)

          let ms = 3000;
          //console.log('signal will be self-destroyed in '+(ms/1000)+' seconds')
          let wait = (ms) => new Promise((resolve, reject) => setTimeout(resolve, ms));
          (async () => { await wait(ms); /*console.log('self-destroying signal');*/ this.destroySignal(); this.scrollChatLogTo(this.chatLogRef.current.scrollHeight) })()
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
    })
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
      this.setState({
        inputText: ''
      })
    })
    .catch(err => {
      console.log('Message was not sent. Error:', err)
    })
  }

  render() {
    // console.log('render chat pane')
    return (
      <section className="chat-pane">
        <div className="chat-header">
          <div className="chat-header-title">To: {this.props.session.recipient.name}</div>
        </div>
        <div ref={this.chatLogRef} className="chat-log hide-scrollbar">
          <ChatLog />
          <ChatSignal />
        </div>
        <div className="chat-input design1">
          <textarea type="text" className="chat-input-text" autoFocus="true" rows="auto" placeholder='Type...' value={this.state.inputText} onChange={this.handleInputTextChange} />
          <button type="button" className="chat-input-text-submit" onClick={this.handleInputTextSubmit}>Send</button>
        </div>
      </section>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatPane)