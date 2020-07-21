import { sendRpc } from '../store/actions/rpc';
import { ReducerStore } from '../store/reducers';
import { REMOVE_USER } from '../store/types/users';
import * as ws from 'ws';

const CloseController = (store : ReducerStore, userWebSocketMap : Map<string, ws>, userId : string,
   code : number, reason : string ) : Map<string, ws> => {




  // remove the user and make sure to mutate userMap by deleting.

// 7/16/20

  store.dispatch({type:REMOVE_USER, userId, code, reason});
  userWebSocketMap.delete(userId);


  // 7 15 20. pick up on close controller logic to remove users from store when they close websockets.
  // remove associated UUID with ws connection on creation.

  return userWebSocketMap;

}

export default CloseController;
