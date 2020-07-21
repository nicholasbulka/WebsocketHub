// src/store/types/rpcmessage.ts
import { AnyAction } from 'redux';
import * as ws from 'ws';


// see https://en.wikipedia.org/wiki/JSON-RPC

export interface Rpc {
  jsonrpc:string
  rpcId: string
  timestamp: number
}

export interface Params {
  [ propname : string ] : string
}
export interface Result {
  [ propname : string ] : string
}

export interface RpcRequest extends Rpc{
  id: string
  method: string
  params: Params
  userId: string
}

export interface RpcResponse extends Rpc{
  id: string
  result: Result
  userId: string
}

export interface RpcNotification extends Rpc{
  params: Params
  method: string
}

export interface RpcState {
  history: Rpc[]
}

export const SEND_RPC = 'SEND_RPC'

interface SendRpc extends AnyAction {
  type: typeof SEND_RPC
  rpc: Rpc
  socket: ws
}

export type RpcActionTypes = SendRpc
