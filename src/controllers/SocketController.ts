import * as ws from 'ws';
import { isJSON, randomItemId, randomRpcId } from '../util/util';
import { reducerStore } from '../store/reducers';
import { User } from '../store/types/users';
import { RpcNotification } from '../store/types/rpc';
import { sendRpcNotification } from '../store/actions/rpc';

// npm start creates server but this doesn't run upfront.
// runs when someone joins server at /room/:id
const SocketController = (socket : ws ) => {

  const store = reducerStore();
  const id = randomItemId(store.getState().user.users);
  const dateNow = Date.now();

  const user : User = {
    socket,
    username: 'user-' + id,
    joined: dateNow,
    log: 'created : ' + dateNow.toString(),
    lastActivity: 'created : ' + dateNow.toString(),
    role: 'user',
    userId: '001'+id,
    itemId: id,
    location: {x:1,y:2,z:0}
  }

  const rpc : RpcNotification = {
    jsonrpc: "2.0",
    params: {update:"New Websocket"},
    rpcId: randomRpcId(store.getState().rpc.history),
    timestamp:Date.now()
  }

  store.dispatch({type: "ADD_USER", user});
  store.dispatch(sendRpcNotification(rpc, socket));

  socket.on('message', (msg : string|Buffer|ArrayBuffer|Buffer[]) => {
    store.dispatch(sendRpcNotification(rpc, socket));

    if(isJSON(msg) === false) {
      return;
    }

  });
}

export default SocketController;




const users : {username: string, socket : ws}[] = [];

const sendMessage = (socket : ws, data : object) => {
  const d = JSON.stringify({
    jsonrpc: '2.0',
    ...data
  });
  socket.send(d);
}

const isUsernameTaken = (username : string) => {
  let taken = false;
  for (const user of users) {
    if (user.username === username) {
      taken = true;
      break;
    }
  }
  return taken;
}
/*
const SocketController = (socket : ws ) => {

  const store = reducerStore();
  const id = randomItemId(store.getState().user.users);
  const dateNow = Date.now();

  const user : User = {
    socket,
    username: 'user-' + id,
    joined: dateNow,
    log: 'created : ' + dateNow.toString(),
    lastActivity: 'created : ' + dateNow.toString(),
    role: 'user',
    userId: '001'+id,
    itemId: id,
    location: {x:1,y:2,z:0}
  }

  store.dispatch({type: "ADD_USER", user});

  socket.on('message', (msg : string|Buffer|ArrayBuffer|Buffer[]) => {

    if(isJSON(msg) === false) {
      return;
    }

    const data = JSON.parse(msg.toString());

    switch (data.method) {
      case 'username':

        if (isUsernameTaken(data.params.username)) {
          sendMessage(socket, {id: data.id, error: {message: 'Username is taken'}})
        } else {
          users.push({
            username: data.params.username,
            socket,
          });
          sendMessage(socket, {id: data.id, result: {status: 'success'}})
        }
        break;

      case 'moveCard':
        // send message to all connected users
        users.forEach(listener => {
          sendMessage(listener.socket, {method: 'updateMoveCard',
            params: {cardId: data.params.cardId,
            location: {x:data.params.location.x,
                      y:data.params.location.y,
                      z:data.params.location.z}}});
        })
        break;
    }
  })
}*/
