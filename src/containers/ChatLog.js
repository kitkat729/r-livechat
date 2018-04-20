import { connect } from 'react-redux'
import ChatLogMessages from '../components/ChatLogMessages'

const mapStateToProps = state => ({
  chatLog: state.chatLog
})

export default connect(mapStateToProps)(ChatLogMessages)

