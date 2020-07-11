// src/store/actions/chat.ts

import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TDispatch, TAppState, TGetState} from '../reducers';
import { sendRpc } from './rpc';
import { TextMessage, SEND_TEXT_MESSAGE, MESSAGE_ALL, ChatActionTypes } from '../types/chat';
import { RpcRequest, RpcResponse } from '../types/rpc';
import { v4 as uuidv4 } from 'uuid';


export function sendMessage(textMessage: TextMessage): ChatActionTypes {
  return {
    type: SEND_TEXT_MESSAGE,
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

export const messageAll = (textMessage: TextMessage, senderId: string): ThunkAction<void,
                                                            TAppState,
                                                            any,
                                                            AnyAction> =>
(dispatch: TDispatch, getState: TGetState) => {     // nameless functions

    const users = getState().user.users;


    dispatch({type: MESSAGE_ALL, message: textMessage});
    return users.map(user => sendRpc(rpcFromMessage(textMessage, senderId), user.socket));

}
