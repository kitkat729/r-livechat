import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import ChatLogSignal from '../components/ChatLogSignal'
import {
  removeChatSignal
} from '../actions'

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    destroy: removeChatSignal
  }, dispatch)
}

const mapStateToProps = state => {
  return {
    signal: state.signal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatLogSignal)