import { reducerStore } from '../store/reducers';
import logger from '../util/logger';
import * as ws from 'ws';

const MessageController = (socket : ws, msg : string|Buffer|ArrayBuffer|Buffer[] ) : void => {
  const store = reducerStore();

  const parsedJSON = JSON.parse(msg.toString());
  const method = typeof parsedJSON.method !== 'undefined' ? parsedJSON.method : 'undefined method';

  switch(method) {
    // response from "server"
    case 'update':
      console.log('update logic');
      break;
    case 'move':
      console.log('move logic');
      break;
    case 'undefined method':
      logger.info('undefined method in MessageController : ' + msg);
    default:
      // code block
  }

}

export default MessageController;
