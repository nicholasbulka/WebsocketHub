import { ReducerStore } from '../../store/reducers';
import { RpcNotification, RpcResponse, Rpc } from '../../store/types/rpc';

import logger from '../../util/logger';
import { SERVERID, USERPREFIX, ALL } from '../../util/constants';

import { RpcRequest} from '../../store/types/rpc'
import { v4 as uuidv4 } from 'uuid';


import * as ws from 'ws';
import { ClientInfo } from '../../store/types/util';
import { sendRpc } from '../../store/actions/rpc';
import { mapMessageToOtherSockets } from '../../store/actions/meta';

// {"jsonrpc":"2.0", "method":"messageAll", "params":{"message":"hello world!"}, "id":"1"}

export const ChatMessageAllController = ( clientInfo : ClientInfo, msg : string|Buffer|ArrayBuffer|Buffer[], rpcMessageAllNotification : RpcNotification, rpcMessageAllResponse : RpcResponse ) : void => {

  if(typeof msg !== 'string'){ return };

  const msgObj = JSON.parse(msg);

  rpcMessageAllNotification.params = msgObj.params;
  rpcMessageAllNotification.params.sender = clientInfo.userId;

  clientInfo.store.dispatch(sendRpc(rpcMessageAllResponse, clientInfo.socket));
  mapMessageToOtherSockets((socket : ws) => { clientInfo.store.dispatch(sendRpc(rpcMessageAllNotification, socket))}, clientInfo.socketMap, clientInfo.userId, rpcMessageAllNotification);

}
