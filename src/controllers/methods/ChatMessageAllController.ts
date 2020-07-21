import { ReducerStore } from '../../store/reducers';
import { RpcNotification, RpcResponse } from '../../store/types/rpc';

import logger from '../../util/logger';
import { chatMessageSendToAllButSender, chatMessageSenderConfirmation } from '../../store/actions/chat';
import { SERVERID, USERPREFIX, ALL } from '../../util/constants';

import { RpcRequest} from '../../store/types/rpc'
import { v4 as uuidv4 } from 'uuid';


import * as ws from 'ws';
import { ClientInfo } from '../../store/types/util';
import { sendRpc } from '../../store/actions/rpc';
import { mapMessageToOtherSockets } from '../../store/actions/meta';

export const ChatMessageAllController = ( clientInfo : ClientInfo, msg : string|Buffer|ArrayBuffer|Buffer[], rpcMessageAllNotification : RpcNotification, rpcMessageAllResponse : RpcResponse ) : void => {
  clientInfo.socket.send(rpcMessageAllResponse);
  mapMessageToOtherSockets((socket : ws) => { sendRpc(rpcMessageAllNotification, socket)}, clientInfo.socketMap, clientInfo.userId, rpcMessageAllNotification);

}
