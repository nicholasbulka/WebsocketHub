import { RpcNotification, RpcResponse } from '../store/types/rpc';
import logger from '../util/logger';

import { RpcRequest} from '../store/types/rpc'
import { v4 as uuidv4 } from 'uuid';

import { ChatMessageAllController } from './methods/ChatMessageAllController';
import { ClientInfo } from '../store/types/util';

const MessageController = ( clientInfo : ClientInfo, msg : string ) : void => {

  const parsedJSON : RpcRequest = JSON.parse(msg);
  const method = typeof parsedJSON.method !== 'undefined' ? parsedJSON.method : 'undefined method';
  const id = typeof parsedJSON.id !== 'undefined' ? parsedJSON.id : '-2';

  // how can we tell who sent the message?
  // console.log(socket);

  const rpcMessageNotification : RpcNotification = {
    jsonrpc: "2.0",
    method: 'update',
    params: {
      store: JSON.stringify(clientInfo.store.getState())
    },
    rpcId: uuidv4(),
    timestamp: Date.now()
  }

  const rpcMessageResponse : RpcResponse = {
    jsonrpc: "2.0",
    userId: "0010",
    timestamp: Date.now(),
    rpcId: uuidv4(),
    id,
    result: {
      store: JSON.stringify(clientInfo.store.getState())
    }
  };

  // method set by client.
  switch(method) {
    // response from "server"
    case 'update':
      // console.log('update logic');
      break;
    case 'move':
      // console.log('move logic');
      break;
    case 'messageAll':
      ChatMessageAllController(clientInfo, msg, rpcMessageNotification, rpcMessageResponse);
      break;
    case 'undefined method':
       logger.info('undefined method in MessageController : ' + msg);
    default:
      // code block
  }

}

export default MessageController;
