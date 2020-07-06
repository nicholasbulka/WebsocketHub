// src/store/types/rpcmessage.ts
import { AnyAction } from 'redux';
import * as ws from 'ws';


// see https://en.wikipedia.org/wiki/JSON-RPC

export interface Rpc {
  jsonrpc:string
  rpcId: string
  userId: string
  timestamp: number
}

export interface RpcRequest extends Rpc{
  id: string
  method: string
  params: object
}

export interface RpcResponse extends Rpc{
  id: string
  result: string
}

export interface RpcNotification extends Rpc{
  params: object
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
