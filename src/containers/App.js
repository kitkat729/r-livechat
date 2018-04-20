import { connect } from 'react-redux'
import ChatApp from '../components/ChatApp'

const mapStateToProps = state => {
  return {
    chatSession: state.chatApp.chatSession
  }
}

export default connect(mapStateToProps)(ChatApp)
