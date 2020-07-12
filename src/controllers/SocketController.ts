import * as ws from 'ws';
import { isJSON } from '../util/util';
import logger from '../util/logger';

import { reducerStore } from '../store/reducers';
import { User } from '../store/types/users';
import { RpcNotification } from '../store/types/rpc';
import { sendRpc } from '../store/actions/rpc';
import { SERVERID, USERPREFIX } from '../util/constants';
import { ADD_USER } from '../store/types/users'
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { store } from './RoomController';

import MessageController from './MessageController';
import ErrorController from './ErrorController';
import CloseController from './CloseController';

// npm start creates server but this doesn't run upfront.
// '/:id/:userId', SocketController


const SocketController = (socket : ws, req : Request) : void => {

  // console.log(store.getState());

  const id = uuidv4();
  const username = 'user-' + id;
  const rpcId = uuidv4();

  // channels
  // ws.id = userId; want to do something like this < -----

  const userId = req.params.userId;
  const dateNow = Date.now();

  const user : User = {
    socket,
    username,
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
    method: 'newConnection',
    params: {
      updateMessage: "New Websocket Connection: " + username,
      userName: username
    },
    rpcId,
    userId,
    timestamp: Date.now()
  }

  store.dispatch({type: ADD_USER, user});
  store.dispatch(sendRpc(rpc, socket));
  // console.log(store.getState());
  console.log('socketcontroller');

  socket.on('message', (msg : string|Buffer|ArrayBuffer|Buffer[]) => {

    // {"json-rpc":"2.0", "method":"greet", "params":{"message":"hello"}}
    // store.dispatch(sendRpc(rpc, socket));

    if(isJSON(msg) === false) {
      logger.log('info', 'catch error %s', msg);
      return;
    }

    MessageController(socket, msg);

  });

  socket.on('error', (error : Error) => {

    // ErrorController(socket, error);

  });

  socket.on('close', (code : number, reason : string) => {

    // CloseController(socket, code, reason);

  });

}

export default SocketController;
