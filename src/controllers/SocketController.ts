import { isJSON, getUserIdFromWS } from '../util/util';
import logger from '../util/logger';
import * as ws from 'ws';
import { reducerStore, ReducerStore } from '../store/reducers';
import { User } from '../store/types/users';
import { RpcNotification, RpcResponse } from '../store/types/rpc';
import { sendRpc } from '../store/actions/rpc';
// import { updateStoreInRedis } from '../store/actions/meta';
import { ADD_USER } from '../store/types/users'
import { v4 as uuidv4 } from 'uuid';
import { Request } from 'express';
import { redisClient } from '../index'

import MessageController from './MessageController';
import ErrorController from './ErrorController';
import CloseController from './CloseController';
import { sendFullStore } from '../store/actions/meta';
import { ClientInfo } from '../store/types/util';

const roomToUserWebSocketMap = new Map<string, Map<string, ws>>();

// move all of this into a Store controller 7/14/2020
const SocketController = (socket : ws, req : Request) : void => {

  // main store, ensure this gets passed to everything.
  const checkPasses : boolean = typeof req.redisStore === 'string' && req.redisStore.length >= 1;
  const store = checkPasses ? reducerStore(JSON.parse(JSON.stringify(req.redisStore))) : reducerStore({rediskey:req.params.roomId});

  const dateNow = Date.now();

  const userId = uuidv4();
  const roomId = req.params.roomId;

  const user : User = {
    username: 'user-' + userId,
    joined: dateNow,
    log: 'created : ' + dateNow.toString(),
    lastActivity: 'created : ' + dateNow.toString(),
    role: 'user',
    room: roomId,
    userId,
    itemId: userId,
    location: {x:1,y:2,z:0}
  }

  const rpc : RpcResponse = {
    jsonrpc : '2.0',
    result: {readyState: socket.readyState.toString(), userId},
    id: '-1',
    rpcId: uuidv4(),
    userId,
    timestamp: dateNow


  }

  let userWebSocketMap = new Map<string, ws>();
  const roomMap = roomToUserWebSocketMap.get(roomId);

  if(typeof roomMap === 'undefined'){
    userWebSocketMap = new Map<string, ws>([[user.userId, socket]]);
  }
  else {
    userWebSocketMap = roomMap;
  }

  userWebSocketMap.set(user.userId, socket);
  roomToUserWebSocketMap.set(roomId, userWebSocketMap);
  console.log(roomToUserWebSocketMap);
  store.dispatch({type: ADD_USER, user});
  store.dispatch(sendRpc(rpc, socket));

  // we want to make sure this only
  store.dispatch(sendFullStore(userWebSocketMap));

  /*const metaTypeAction : Middleware<{},any, Dispatch<AnyAction>> =
  	store => next => async action  => {
    const result = next(action);
  	const storeUsers : User[] = store.getState().user.users;

  	if(typeof action.meta_destination === 'object'){
      storeUsers.forEach((u) => {
  			console.log(u.userId);
  			console.log(action.meta_destination.sockets);
  			console.log(action.meta_destination.sockets.get(u.userId));

  			const socket = action.meta_destination.sockets.get(u.userId);
  			console.log(typeof socket);

  			socket.send(action.meta_destination.rpc.toString());
  		});

  	}
    return result;
  }*/


  socket.on('message', (msg : string|Buffer|ArrayBuffer|Buffer[]) => {

    if(isJSON(msg) === false || typeof msg !== 'string') {
      logger.log('info', 'catch error %s', msg);
      return;
    }

    const userIdFromWs = getUserIdFromWS(socket, userWebSocketMap);

    if(typeof userIdFromWs === 'string'){
      const clientInfo : ClientInfo = { userId : userIdFromWs, socket, socketMap : userWebSocketMap, store };
      MessageController(clientInfo, msg);
    }
    else {
      return;
    }

  });

  socket.on('error', (error : Error) => {

    // ErrorController(socket, error);

  });

  socket.on('close', (code : number, reason : string) => {


  // loop through using
    store.getState().user.users.forEach((u) => {

      const userSocket = userWebSocketMap.get(u.userId);
      if(userSocket === socket){
        userWebSocketMap = CloseController(store, userWebSocketMap, u.userId, code, reason);
      }
    })

  });

  }

export default SocketController;
