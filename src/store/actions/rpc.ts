// src/store/actions/chat.ts
import { AnyAction, } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import logger from '../../util/logger';
import { isJSON } from '../../util/util';
import * as ws from 'ws';

import { RpcRequest, RpcResponse, RpcNotification,
        SEND_RPC_REQUEST, SEND_RPC_RESPONSE, SEND_RPC_NOTIFICATION,
        RpcActionTypes } from '../types/rpc';

export const sendRpcRequest = (rpc: RpcRequest): RpcActionTypes => {
  return {
    type: SEND_RPC_REQUEST,
    rpc
  }
}

export const sendRpcResponse = (rpc: RpcResponse): RpcActionTypes => {
  return {
    type: SEND_RPC_RESPONSE,
    rpc
  }
}

type RootState = {};
type ExtraArg = undefined;
type ThunkResult<R> = ThunkAction<R, RootState, ExtraArg, AnyAction>;
type BasicThunkDispatch = ThunkDispatch<RootState, ExtraArg, AnyAction>;

export const sendRpcNotification = (rpc: RpcNotification): ThunkResult<void> =>
  (dispatch, getState) => {     // nameless functions

    // const socket = getState().socket;
    const sendMessage = (socket : ws, data : object) => {

    if(isJSON(JSON.stringify(data)) === false) {
      logger.info(JSON.stringify(data));
    }

    const d = JSON.stringify({
      ...data
    });
    dispatch({ type: SEND_RPC_NOTIFICATION, rpc });
    return socket.send(d)

    }
  }
