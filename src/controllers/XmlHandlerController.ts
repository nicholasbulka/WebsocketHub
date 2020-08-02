import { RpcNotification, RpcResponse } from '../store/types/rpc';
import logger from '../util/logger';

import { RpcRequest} from '../store/types/rpc'
import { v4 as uuidv4 } from 'uuid';

import { ClientInfo } from '../store/types/util';


export const XmlHandlerController = ( clientInfo : ClientInfo, msg : string|Buffer|ArrayBuffer|Buffer[], rpcMessageAllResponse : RpcResponse ) : void => {

console.log('hi');

}

export default XmlHandlerController
