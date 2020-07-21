import {
	combineReducers, Store, createStore, applyMiddleware, AnyAction, Middleware, Dispatch
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'
import { redisClient } from '../../index';
import user from './users';
import chat from './chat';
import card from './card';
import cardcollection from './cardcollection';
import rpc from './rpc';
import rediskey from './rediskey';


export const reducers = combineReducers({
	rediskey,
	user,
  chat,
  card,
  cardcollection,
  rpc

})
export type RootState = ReturnType<typeof reducers>

const redisSaver : Middleware<{},any, Dispatch<AnyAction>> =
	store => next => async action  => {
  const result = next(action)
	const storeValue = JSON.stringify(store.getState());
  const key = store.getState().rediskey.toString();

	await redisClient.set(key, storeValue);
  return result;
}

import { composeWithDevTools } from 'redux-devtools-extension';
import { User } from '../types/users';

export type TAppState = ReturnType<typeof reducers>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & { dispatch: TDispatch };
export type TGetState = () => TAppState;


export const reducerStore = (initState = {}) : TStore => {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});


  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore(
    reducers,
		initState,
    composeEnhancers(applyMiddleware(thunkMiddleware,/* logger, */redisSaver)),
  );
}

export type ReducerStore = ReturnType<typeof reducerStore>
