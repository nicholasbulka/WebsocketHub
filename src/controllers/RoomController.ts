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




// npm start creates server but this doesn't run upfront.
// '/:id/:userId', SocketController

const rpc : RpcNotification = {
  jsonrpc: "2.0",
  method: 'roomcontr',
  params: {
    updateMessage: "New Websocket Connection: " + 'hi',
    userName: 'hi'
  },
  rpcId: '123',
  userId: '1234',
  timestamp: Date.now()
}


export const store = reducerStore();

const RoomController = (socket : ws, req : Request) : void => {

  // the first thing we need to do is look for a store for this roomId.
  if(req.params.id){

    // const store = reducerStore();
    const clients = store.getState().user.users;

  }

  console.log('roomcontroller');
  const dateNow = Date.now();

  const user : User = {
    socket,
    username:'billy',
    joined: dateNow,
    log: 'created : ' + dateNow.toString(),
    lastActivity: 'created : ' + dateNow.toString(),
    role: 'user',
    userId: '25',
    itemId: '24',
    location: {x:1,y:2,z:0}
  }
  store.dispatch({type: ADD_USER, user});


  socket.on('message', (msg : string|Buffer|ArrayBuffer|Buffer[]) => {

  /*  clients.forEach((client) => {
      console.log(client);
      console.log('client');
      client.socket.send(msg);
    });*/

    // {"json-rpc":"2.0", "method":"greet", "params":{"message":"hello"}}

    // store.dispatch(sendRpc(rpc, socket));
    // console.log(store.getState());

    if(isJSON(msg) === false) {
      logger.log('info', 'catch error %s', msg);
      return;
    }

    // MessageController(socket, msg);

  });

  socket.on('error', (error : Error) => {

    // ErrorController(socket, error);

  });

  socket.on('close', (code : number, reason : string) => {

    // CloseController(socket, code, reason);

  });

}

export default RoomController;
