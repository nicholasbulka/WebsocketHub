// src/store/actions/chat.ts

import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TDispatch, TAppState, TGetState} from '../reducers';
import { sendRpc } from './rpc';
import { TextMessage, SEND_TEXT_MESSAGE, MESSAGE_ALL, ChatActionTypes } from '../types/chat';
import { RpcResponse } from '../types/rpc';
import { v4 as uuidv4 } from 'uuid';

export const sendFullStore = (textMessage: TextMessage, senderId: string): ThunkAction<void,
                                                            TAppState,
                                                            any,
                                                            AnyAction> =>
(dispatch: TDispatch, getState: TGetState) => {     // nameless functions

    const users = getState().user.users;
    const store = getState();

    const rpc : RpcResponse = {
      jsonrpc: "2.0",
      userId: "0010",
      timestamp: Date.now(),
      rpcId: uuidv4(),
      id: "0010",
      result: store.toString()

    };

    dispatch({type: MESSAGE_ALL, message: textMessage});
    return users.map(user => sendRpc(rpc, user.socket));

}