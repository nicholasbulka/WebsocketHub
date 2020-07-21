import { ReducerStore } from "../reducers";
import * as ws from 'ws';


export interface Vec3 {
  x: number
  y: number
  z: number
}

export interface Item {
  itemId: string
  location: Vec3
}

export interface ClientInfo {
  userId: string
  socket: ws
  socketMap: Map<string, ws>
  store: ReducerStore
}

export const UPDATE_STORE_IN_REDIS = 'UPDATE_STORE_IN_REDIS';
export const SET_REDIS_KEY = 'SET_REDIS_KEY';

// both necessary?
export const SEND_FULL_STORE = 'SEND_FULL_STORE';
export const SEND_FULL_STORE_ALL_BUT_SENDER = 'SEND_FULL_STORE_ALL_BUT_SENDER';
