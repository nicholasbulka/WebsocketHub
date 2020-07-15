import * as ws from 'ws';
import { isJSON } from '../util/util';
import logger from '../util/logger';

import { reducerStore, ReducerStore } from '../store/reducers';
import { User } from '../store/types/users';
import { RpcNotification } from '../store/types/rpc';
import { sendRpc } from '../store/actions/rpc';
// import { updateStoreInRedis } from '../store/actions/meta';
import { SERVERID, USERPREFIX } from '../util/constants';
import { ADD_USER } from '../store/types/users'
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { redisClient } from '../index'

import MessageController from './MessageController';
import ErrorController from './ErrorController';
import CloseController from './CloseController';

// move all of this into a Store controller 7/14/2020
const SocketController = (socket : ws, req : Request) : void => {

  // main store, ensure this gets passed to everything.
  const store = req.redisStore != null ? reducerStore(JSON.parse(req.redisStore.toString())) : reducerStore({rediskey:req.params.roomId});




  const dateNow = Date.now();

  const user : User = {
    socket,
    username: req.params.userId,
    joined: dateNow,
    log: 'created : ' + dateNow.toString(),
    lastActivity: 'created : ' + dateNow.toString(),
    role: 'user',
    userId: '25',
    itemId: '24',
    location: {x:1,y:2,z:0}
  }

  store.dispatch({type: ADD_USER, user});
  // console.log(store.getState().user.users.length + ' length');
    // end 7/12/20 update dispatch function to call updatestoreinredis every time.
    // store.dispatch(updateStoreInRedis(req.params.roomId));

  socket.on('message', (msg : string|Buffer|ArrayBuffer|Buffer[]) => {

  /*  clients.forEach((client) => {
      console.log(client);
      console.log('client');
      client.socket.send(msg);
    });*/

    // {"json-rpc":"2.0", "method":"greet", "params":{"message":"hello"}}

    // store.dispatch(sendRpc(rpc, socket));
    socket.send('hello');

    if(isJSON(msg) === false) {
      logger.log('info', 'catch error %s', msg);
      return;
    }
    // store.dispatch(updateStoreInRedis(req.params.roomId));
  //  MessageController(socket, msg);

  });

  socket.on('error', (error : Error) => {

    // ErrorController(socket, error);

  });

  socket.on('close', (code : number, reason : string) => {

    CloseController(store, socket, code, reason);

  });

}

export default SocketController;
