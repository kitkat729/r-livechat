import _ from 'lodash'
import {
  CHAT_CREATE_APP
} from '../constants/actionTypes'

const chatApp = (state = {}, action) => {
  switch (action.type) {
    case CHAT_CREATE_APP:
      state = _.merge({}, state, {
        chatSession: action.session
      })
      return state
    default:
      return state
  }
}

export default chatApp