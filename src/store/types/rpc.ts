// src/store/types/rpcmessage.ts
import { AnyAction } from 'redux';
import * as ws from 'ws';


// see https://en.wikipedia.org/wiki/JSON-RPC

export interface RpcDataPoint {
  jsonrpc:string
  rpcId: string
  timestamp: number
}

export interface RpcRequest extends RpcDataPoint{
  id: string
  method: string
  params: object
}

export interface RpcResponse extends RpcDataPoint{
  id: string
  result: string
}

export interface RpcNotification extends RpcDataPoint{
  params: object
}

export interface RpcState {
  history: RpcDataPoint[]
}

export const SEND_RPC_REQUEST = 'SEND_RPC_REQUEST'
export const SEND_RPC_RESPONSE = 'SEND_RPC_RESPONSE'
export const SEND_RPC_NOTIFICATION = 'SEND_RPC_NOTIFICATION'

interface SendRpcRequest extends AnyAction {
  type: typeof SEND_RPC_REQUEST
  rpc: RpcRequest
  socket: ws
}

interface SendRpcResponse extends AnyAction {
  type: typeof SEND_RPC_RESPONSE
  rpc: RpcResponse
  socket: ws
}

interface SendRpcNotification extends AnyAction {
  type: typeof SEND_RPC_NOTIFICATION
  rpc: RpcNotification
  socket: ws
}

export type RpcActionTypes = SendRpcRequest | SendRpcResponse | SendRpcNotification
