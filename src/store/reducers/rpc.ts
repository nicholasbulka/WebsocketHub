// src/store/reducers/rpc.ts
import { AnyAction, Reducer } from 'redux';

import {
  RpcState,
  SEND_RPC_REQUEST,
  SEND_RPC_RESPONSE,
  SEND_RPC_NOTIFICATION
} from '../types/rpc'

const initialState: RpcState = {
  history: []
}

const history: Reducer<RpcState, AnyAction> = ( state = initialState, action: AnyAction ): RpcState => {
  switch (action.type) {
    case SEND_RPC_REQUEST:
      return {
        history: [ ...state.history, action.rpc]
      }
    case SEND_RPC_RESPONSE:
      return {
        history: [ ...state.history, action.rpc]
      }
    case SEND_RPC_NOTIFICATION:
      return {
        history: [ ...state.history, action.rpc]
      }
    default:
      return state
  }
}

export default history;
