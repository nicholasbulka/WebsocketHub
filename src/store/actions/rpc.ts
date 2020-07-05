// src/store/actions/chat.ts
import { TDispatch, TAppState, /*TGetState*/} from '../reducers';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import logger from '../../util/logger';
import { isJSON } from '../../util/util';
import * as ws from 'ws';

import { RpcRequest, RpcResponse, RpcNotification,
        SEND_RPC_REQUEST, SEND_RPC_RESPONSE, SEND_RPC_NOTIFICATION,
        RpcActionTypes } from '../types/rpc';

export const sendRpcRequest = (rpc: RpcRequest, socket : ws): RpcActionTypes => {
  return {
    type: SEND_RPC_REQUEST,
    rpc,
    socket
  }
}

export const sendRpcResponse = (rpc: RpcResponse, socket : ws): RpcActionTypes => {
  return {
    type: SEND_RPC_RESPONSE,
    rpc,
    socket

  }
}


export const sendRpcNotification = (rpc: RpcNotification, socket: ws): ThunkAction<void,
                                                            TAppState,
                                                            any,
                                                            AnyAction> =>
  (dispatch: TDispatch, /*getState: TGetState*/) => {     // nameless functions

    // const socket = getState().socket;

      if(isJSON(JSON.stringify(rpc)) === false) {
        logger.info(JSON.stringify(rpc));
      }

      const d = JSON.stringify({
        ...rpc
      });

      dispatch({ type: SEND_RPC_NOTIFICATION, rpc });
      return socket.send(d);

  }
