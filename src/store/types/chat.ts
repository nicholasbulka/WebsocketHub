// src/store/types/chat.ts
 import { AnyAction } from 'redux';

export interface TextMessage {
  user: string
  message: string
  timestamp: number
  messageId: string

}

export interface ChatState{
  messages: TextMessage[]
}

export const SEND_TEXT_MESSAGE = 'SEND_TEXT_MESSAGE';
export const CHAT_MESSAGE_ALL_BUT_SENDER = 'CHAT_MESSAGE_ALL_BUT_SENDER';
export const CHAT_MESSAGE_SENDER_CONFIRMATION = 'CHAT_MESSAGE_SENDER_CONFIRMATION';


interface SendTextMessageAction extends AnyAction{
  type: typeof SEND_TEXT_MESSAGE
  textMessage: TextMessage
}
interface ChatMessageAllAction extends AnyAction{
  type: typeof CHAT_MESSAGE_ALL_BUT_SENDER
  textMessage: TextMessage
}
interface ChatMessageSenderConfirmation extends AnyAction{
  type: typeof CHAT_MESSAGE_SENDER_CONFIRMATION
  textMessage: TextMessage
}


export type ChatActionTypes = SendTextMessageAction | ChatMessageAllAction | ChatMessageSenderConfirmation
