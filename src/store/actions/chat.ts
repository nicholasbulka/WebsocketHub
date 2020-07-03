// src/store/actions/chat.ts

import { TextMessage, SEND_MESSAGE, DELETE_MESSAGE, ChatActionTypes } from '../types/chat';

// TypeScript infers that this function is returning SendMessageAction
export function sendMessage(newMessage: TextMessage): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: newMessage
  }
}

// TypeScript infers that this function is returning DeleteMessageAction
export function deleteMessage(messageId: string): ChatActionTypes {
  return {
    type: DELETE_MESSAGE,
    meta: {
      messageId
    }
  }
}
