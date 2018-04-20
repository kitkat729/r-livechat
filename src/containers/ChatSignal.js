import { connect } from 'react-redux'
import ChatLogSignal from '../components/ChatLogSignal'

const mapStateToProps = state => {
  return {
    chatSignal: state.chatSignal
  }
}

export default connect(mapStateToProps)(ChatLogSignal)