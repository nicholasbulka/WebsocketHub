import { reducerStore } from '../store/reducers';
import logger from '../util/logger';
import { MESSAGE_ALL_RECEIVED } from '../store/types/chat';
import { RpcRequest} from '../store/types/rpc'

import * as ws from 'ws';

const MessageController = (socket : ws, msg : string|Buffer|ArrayBuffer|Buffer[] ) : void => {
  const store = reducerStore();

  const parsedJSON : RpcRequest = JSON.parse(msg.toString());
  const method = typeof parsedJSON.method !== 'undefined' ? parsedJSON.method : 'undefined method';

  // how can we tell who sent the message?
  console.log(socket);

  switch(method) {
    // response from "server"
    case 'update':
      // console.log('update logic');
      break;
    case 'move':
      // console.log('move logic');
      break;
    case 'messageAll':
      if(parsedJSON.params != null){
        store.dispatch({type: MESSAGE_ALL_RECEIVED, message: parsedJSON.params.message});
      }
      break;
    case 'undefined method':
      // logger.info('undefined method in MessageController : ' + msg);
    default:
      // code block
  }

}

export default MessageController;
