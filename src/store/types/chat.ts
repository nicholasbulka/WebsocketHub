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

export const SEND_TEXT_MESSAGE = 'SEND_TEXT_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

interface SendTextMessageAction extends AnyAction{
  type: typeof SEND_TEXT_MESSAGE
  textMessage: TextMessage
}

export type ChatActionTypes = SendTextMessageAction
