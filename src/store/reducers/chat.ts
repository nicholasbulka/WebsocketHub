// src/store/reducers/chat.ts

import { AnyAction, Reducer } from 'redux';

import {
  ChatState,
  SEND_TEXT_MESSAGE,
  CHAT_MESSAGE_ALL_BUT_SENDER,
  CHAT_MESSAGE_SENDER_CONFIRMATION
} from '../types/chat'

const initialState: ChatState = {
  messages: []
}

const chat : Reducer<ChatState, AnyAction> = (
  state = initialState,
  action: AnyAction
): ChatState => {
  switch (action.type) {
    case CHAT_MESSAGE_ALL_BUT_SENDER:
      return {
        messages: [...state.messages, action.textMessage]
      }
    case CHAT_MESSAGE_SENDER_CONFIRMATION:
      return {
        messages: [...state.messages, action.textMessage]
      }
    case SEND_TEXT_MESSAGE:
      return {
        messages: [...state.messages, action.textMessage]
      }

    default:
      return state
  }
}

export default chat;
