import {
	combineReducers, Store, createStore, applyMiddleware
} from 'redux';
import thunkMiddleware from 'redux-thunk';


import user from './users';
import chat from './chat';
import card from './card';
import cardcollection from './cardcollection';

export const reducers = combineReducers({
	user,
  chat,
  card,
  cardcollection
})


import { composeWithDevTools } from 'redux-devtools-extension';

export const reducerStore = () : Store => {
  // create the composing function for our middlewares
  const composeEnhancers = composeWithDevTools({});

  // We'll create our store with the combined reducers and the initial Redux state that
  // we'll be passing from our entry point.
  return createStore(
    reducers,
    composeEnhancers(applyMiddleware(thunkMiddleware)),
  );
}
