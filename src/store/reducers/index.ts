import {
	combineReducers, Store, createStore, applyMiddleware, AnyAction
} from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import thunkMiddleware from 'redux-thunk';


import user from './users';
import chat from './chat';
import card from './card';
import cardcollection from './cardcollection';
import rpc from './rpc';

export const reducers = combineReducers({
	user,
  chat,
  card,
  cardcollection,
  rpc
})


import { composeWithDevTools } from 'redux-devtools-extension';

export type TAppState = ReturnType<typeof reducers>;
export type TDispatch = ThunkDispatch<TAppState, void, AnyAction>;
export type TStore = Store<TAppState, AnyAction> & { dispatch: TDispatch };
export type TGetState = () => TAppState;

export const reducerStore = () : TStore => {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  );
}
