import * as ws from 'ws';
import { isJSON } from '../util/util';
import logger from '../util/logger';

import { reducerStore } from '../store/reducers';
import { User } from '../store/types/users';
import { RpcNotification } from '../store/types/rpc';
import { sendRpc } from '../store/actions/rpc';
import { SERVERID, USERPREFIX } from '../util/constants';
import { v4 as uuidv4 } from 'uuid';

import MessageController from './MessageController';
import ErrorController from './ErrorController';
import CloseController from './CloseController';

// npm start creates server but this doesn't run upfront.
// runs when someone joins server at /room/:id

const store = reducerStore();

const SocketController = (socket : ws ) : void => {

  const id = uuidv4();
  const id2 = uuidv4();


  // 001 prefix for users.
  const userId = USERPREFIX + id;
  const dateNow = Date.now();

  const user : User = {
    socket,
    username: 'user-' + id,
    joined: dateNow,
    log: 'created : ' + dateNow.toString(),
    lastActivity: 'created : ' + dateNow.toString(),
    role: 'user',
    userId,
    itemId: id,
    location: {x:1,y:2,z:0}
  }

  const rpc : RpcNotification = {
    jsonrpc: "2.0",
    params: {
      updateMessage: "New Websocket Connection: " + userId,
    },
    rpcId: id2,
    userId: USERPREFIX + SERVERID,
    timestamp: Date.now()
  }

  store.dispatch({type: "ADD_USER", user});
  store.dispatch(sendRpc(rpc, socket));
  console.log(store.getState().user.users.length);

  socket.on('message', (msg : string|Buffer|ArrayBuffer|Buffer[]) => {
    store.dispatch(sendRpc(rpc, socket));

    if(isJSON(msg) === false) {
      logger.log('info', 'catch error %s', msg);
      return;
    }

    MessageController(socket, msg);

  });

  socket.on('error', (error : Error) => {
    store.dispatch(sendRpc(rpc, socket));

    ErrorController(socket, error);

  });

  socket.on('close', (code : number, reason : string) => {
    store.dispatch(sendRpc(rpc, socket));

    CloseController(socket, code, reason);

  });

}

export default SocketController;
