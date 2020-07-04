import * as ws from 'ws';
import { AnyAction } from 'redux';
import { Item } from '../types/util';

// src/store/types/user.ts
export interface User extends Item {
  socket: ws
  username: string
  joined: number
  log: string
  lastActivity: string
  role: string
  userId: string
}
export interface UsersState {
  users: User[]
}

export const SET_USER_ROLE = 'SET_USER_ROLE';
export const ADD_USER = 'ADD_USER';
export const SET_LAST_USER_ACTIVITY = 'SET_LAST_USER_ACTIVITY';

interface SetUserRoleAction extends AnyAction{
  type: typeof SET_USER_ROLE
  userRole: string
  userId: string
}

interface AddUser extends AnyAction{
  type: typeof ADD_USER
  user: User
}

interface SetLastUserActivityAction extends AnyAction{
  type: typeof SET_LAST_USER_ACTIVITY
  userId: string
  lastActivity: string
  lastActivityTime: number
}

export type UserActionTypes = SetUserRoleAction | SetLastUserActivityAction | AddUser
