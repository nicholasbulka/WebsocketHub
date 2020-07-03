import {
	combineReducers
} from 'redux';

import user from './users';
import chat from './chat';
import card from './card';

const reducers = combineReducers({
	user,
  chat,
  card
})

export type RootState = ReturnType<typeof reducers>
