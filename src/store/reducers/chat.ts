// src/store/reducers/chat.ts

import { AnyAction, Reducer } from 'redux';

import {
  ChatState,
  SEND_TEXT_MESSAGE,
  MESSAGE_ALL
} from '../types/chat'

const initialState: ChatState = {
  messages: []
}

const chat : Reducer<ChatState, AnyAction> = (
  state = initialState,
  action: AnyAction
): ChatState => {
  switch (action.type) {
    case MESSAGE_ALL:
      return {
        messages: [...state.messages, action.textMessage]
      }
    default:
      return state
  }
}

export default chat;
