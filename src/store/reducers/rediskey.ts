// src/store/reducers/rpc.ts
import { AnyAction, Reducer } from 'redux';
import { SET_REDIS_KEY} from '../types/util';


const rediskey: Reducer = ( state = {}, action: AnyAction ) => {
  switch (action.type) {
    case SET_REDIS_KEY:
      return {
        rediskey: action.rediskey
      }
    default:
      return state
  }
}

export default rediskey;
