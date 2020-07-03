// src/store/types/chat.ts

export interface TextMessage {
  user: string
  message: string
  timestamp: number
  messageId: string

}

export interface ChatState {
  messages: TextMessage[]
}

export const SEND_MESSAGE = 'SEND_MESSAGE'
export const DELETE_MESSAGE = 'DELETE_MESSAGE'

interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: TextMessage
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE
  meta: {
    messageId: string
  }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction
