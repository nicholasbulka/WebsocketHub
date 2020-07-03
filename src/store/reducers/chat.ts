// src/store/reducers/chat.ts
import {
  ChatState,
  ChatActionTypes,
  SEND_MESSAGE,
  DELETE_MESSAGE
} from '../types/chat'

const initialState: ChatState = {
  messages: []
}

const chat = (
  state = initialState,
  action: ChatActionTypes
): ChatState => {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload]
      }
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(
          message => message.messageId !== action.meta.messageId
        )
      }
    default:
      return state
  }
}

export default chat;
