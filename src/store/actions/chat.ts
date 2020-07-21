// src/store/actions/chat.ts
import * as ws from 'ws';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TDispatch, TAppState, TGetState} from '../reducers';
import { sendRpc } from './rpc';
import { User } from '../types/users';

import { TextMessage, SEND_TEXT_MESSAGE, CHAT_MESSAGE_ALL_BUT_SENDER, CHAT_MESSAGE_SENDER_CONFIRMATION, ChatActionTypes } from '../types/chat';
import { RpcRequest, RpcResponse } from '../types/rpc';
import { v4 as uuidv4 } from 'uuid';


export function sendMessage(textMessage: TextMessage): ChatActionTypes {
  return {
    type: SEND_TEXT_MESSAGE,
    textMessage
  }
}

export function chatMessageSenderConfirmation(textMessage: TextMessage): ChatActionTypes {
  return {
    type: CHAT_MESSAGE_SENDER_CONFIRMATION,
    textMessage
  }
}

export function chatMessageSendToAllButSender(textMessage: TextMessage): ChatActionTypes {
  return {
    type: CHAT_MESSAGE_ALL_BUT_SENDER,
    textMessage
  }
}

const rpcFromMessage = (textMessage: TextMessage, senderId: string) : RpcRequest => {
  const id = uuidv4();
  const message = textMessage.message;
  return {
    jsonrpc:'2.0',
    rpcId:id,
    timestamp: Date.now(),
    userId: senderId,
    id,
    method: 'message',
    params: {
      message
    }
  }
}
