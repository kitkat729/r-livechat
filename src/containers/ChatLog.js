import { connect } from 'react-redux'
import ChatLogMessages from '../components/ChatLogMessages'

const mapStateToProps = state => ({
  log: state.log
})

export default connect(mapStateToProps)(ChatLogMessages)

