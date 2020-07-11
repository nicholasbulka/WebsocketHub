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
export const MESSAGE_ALL = 'MESSAGE_ALL';
export const MESSAGE_ALL_RECEIVED = 'MESSAGE_ALL_RECEIVED';


interface SendTextMessageAction extends AnyAction{
  type: typeof SEND_TEXT_MESSAGE
  textMessage: TextMessage
}
interface SendMessageAllAction extends AnyAction{
  type: typeof MESSAGE_ALL
  textMessage: TextMessage
}
interface MessageAllReceived extends AnyAction{
  type: typeof MESSAGE_ALL_RECEIVED
  textMessage: TextMessage
}

export type ChatActionTypes = SendTextMessageAction | SendMessageAllAction | MessageAllReceived
