import { connect } from 'react-redux'
import ChatLogSignal from '../components/ChatLogSignal'

const mapStateToProps = state => {
  return {
    signal: state.signal
  }
}

export default connect(mapStateToProps)(ChatLogSignal)