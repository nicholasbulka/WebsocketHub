import * as ws from 'ws';
import express from 'express';
import { isJSON } from '../util/util';

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

const RoomController = (socket : ws, req : express.Request) => {

  sendMessage(socket, {some:"message"});

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

      case 'message':
        // send message to all connected users
        users.forEach(user => {
          sendMessage(user.socket, {method: 'update', params: {message: data.params.message}})
        })
        break;
    }
  })
}

export default RoomController;
