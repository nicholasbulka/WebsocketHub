// src/store/actions/user.ts
import { User, SET_USER_ROLE, ADD_USER, SET_LAST_USER_ACTIVITY, UserActionTypes } from '../types/users'
import { RpcResponse, SEND_RPC } from '../types/rpc'

export const setUserRole = (userRole: string, userId: string) : UserActionTypes => {
  return {
    type: SET_USER_ROLE,
    userRole,
    userId
  }
}

export const addUser = (user: User) : UserActionTypes => {
  return {
    type: ADD_USER,
    user
  }
}

export const relayUserId = (rpc : RpcResponse) => {
  return {
    type: SEND_RPC,
    rpc
  }
}

export const setLastUserActivity = (userId : string, lastActivity : string, lastActivityTime : number) : UserActionTypes => {
  return {
    type: SET_LAST_USER_ACTIVITY,
    userId,
    lastActivity,
    lastActivityTime
  }
}
