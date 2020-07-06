// src/store/reducers/rpc.ts
import { AnyAction, Reducer } from 'redux';

import {
  RpcState,
  SEND_RPC
} from '../types/rpc'

const initialState: RpcState = {
  history: []
}

const history: Reducer<RpcState, AnyAction> = ( state = initialState, action: AnyAction ): RpcState => {
  switch (action.type) {
    case SEND_RPC:
      return {
        history: [ ...state.history, action.rpc]
      }
    default:
      return state
  }
}

export default history;
