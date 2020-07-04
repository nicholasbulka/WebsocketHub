// src/store/types/rpcmessage.ts
import { AnyAction } from 'redux';


// see https://en.wikipedia.org/wiki/JSON-RPC

export interface RpcDataPoint {
  jsonrpc:string
  storeId: string
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
}

interface SendRpcResponse extends AnyAction {
  type: typeof SEND_RPC_RESPONSE
  rpc: RpcResponse
}

interface SendRpcNotification extends AnyAction {
  type: typeof SEND_RPC_NOTIFICATION
  rpc: RpcNotification
}

export type RpcActionTypes = SendRpcRequest | SendRpcResponse | SendRpcNotification
