// src/store/reducers/chat.ts
import {
  ChatState,
  ChatActionTypes,
  SEND_TEXT_MESSAGE
} from '../types/chat'

const initialState: ChatState = {
  messages: []
}

const chat = (
  state = initialState,
  action: ChatActionTypes
): ChatState => {
  switch (action.type) {
    case SEND_TEXT_MESSAGE:
      return {
        messages: [...state.messages, action.textMessage]
      }
    default:
      return state
  }
}

export default chat;
