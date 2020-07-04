// src/store/actions/chat.ts

import { TextMessage, SEND_TEXT_MESSAGE, ChatActionTypes } from '../types/chat';

export function sendMessage(textMessage: TextMessage): ChatActionTypes {
  return {
    type: SEND_TEXT_MESSAGE,
    textMessage
  }
}
