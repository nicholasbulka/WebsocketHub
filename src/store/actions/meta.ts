// src/store/actions/chat.ts
import * as ws from 'ws';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TDispatch, TAppState, TGetState} from '../reducers';
import { sendRpc } from './rpc';
import { SEND_FULL_STORE_ALL_BUT_SENDER, SEND_FULL_STORE} from '../types/util';
import { RpcResponse, RpcNotification, Rpc } from '../types/rpc';
import { User } from '../types/users';
import { v4 as uuidv4 } from 'uuid';
import { redisClient } from '../../index';

export const sendFullStore = (sockets: Map<string, ws>): ThunkAction<void,
                                                            TAppState,
                                                            any,
                                                            AnyAction> =>
(dispatch: TDispatch, getState: TGetState) => {     // nameless functions


    const rpc : RpcResponse = {
      jsonrpc: "2.0",
      userId: "0010",
      timestamp: Date.now(),
      rpcId: uuidv4(),
      id: "0010",
      result: {store: JSON.stringify(getState())}

    };

    // get the store with redis.


    dispatch({type: SEND_FULL_STORE, rpc});
    return sockets.forEach((value) => {
      value.send(JSON.stringify(rpc));
    })

}

export const sendFullStoreToAllButSender = (sockets: Map<string, ws>, socket: ws): ThunkAction<void,
                                                            TAppState,
                                                            any,
                                                            AnyAction> =>
(dispatch: TDispatch, getState: TGetState) => {     // nameless functions


    const rpc : RpcNotification = {
      jsonrpc: "2.0",
      timestamp: Date.now(),
      rpcId: uuidv4(),
      params: {store: JSON.stringify(getState())},
      method: 'storeUpdate'

    };

    // get the store with redis.


    dispatch({type: SEND_FULL_STORE_ALL_BUT_SENDER, rpc});
    return sockets.forEach((value) => {
      if(value !== socket){
        value.send(JSON.stringify(rpc));
      }
    })

}

export const mapMessageToOtherSockets = (messageCallback : ((_ : ws, a : RpcNotification) => void), map : Map<string, ws>, userId : string, rpc: RpcNotification) : void => {
  map.forEach((value, key) => {
    if(key !== userId){
      messageCallback(value, rpc);
    }
  })

}



/* refactored as middleware
export const updateStoreInRedis = (key: string): ThunkAction<void,
                                                            TAppState,
                                                            any,
                                                            AnyAction> =>
(dispatch: TDispatch, getState: TGetState) => {     // nameless functions

    const storeValue = JSON.stringify(getState());

    dispatch({type: UPDATE_STORE_IN_REDIS, key });
    return redisClient.set(key, storeValue);


}
*/
