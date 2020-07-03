// src/store/reducers/users.ts
import {
  UserActionTypes,
  UsersState,
  SET_USER_ROLE,
  SET_LAST_USER_ACTIVITY,
  ADD_USER
} from '../types/users'

const initialState: UsersState = {
  users: []
}

const users = (state = initialState, action : UserActionTypes): UsersState => {
	switch (action.type) {

  case ADD_USER:
    return {
      users: [...state.users, action.user]
    }
	case SET_USER_ROLE:
    return {
      users: state.users.map(user =>
      user.userId === action.userId ? {
        ...user, userRole: action.userRole } : user
      )
    }
  case SET_LAST_USER_ACTIVITY:
    return {
      users: state.users.map(user =>
        user.userId === action.userId ? {
          ...user,
          lastActivity: action.lastActivity,
          log: user.log + '\n' + action.lastActivityTime.toString() + ' : ' + action.lastActivity,
        } : user
      )
    }
	default:
		return state
	}
}

export default users
