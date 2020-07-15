import { sendRpc } from '../store/actions/rpc';
import { ReducerStore } from '../store/reducers';

import * as ws from 'ws';

const CloseController = (store : ReducerStore, socket : ws, code : number, reason : string ) : void => {

  console.log(store.getState());
  console.log(reason);
  console.log(code);
  console.log('ranhere');

  // 7 15 20. pick up on close controller logic to remove users from store when they close websockets.
  // remove associated UUID with ws connection on creation.

}

export default CloseController;
