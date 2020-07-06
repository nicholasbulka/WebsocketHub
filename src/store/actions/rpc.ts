// src/store/actions/chat.ts
import { TDispatch, TAppState, /*TGetState*/} from '../reducers';
import { AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import logger from '../../util/logger';
import { isJSON } from '../../util/util';
import * as ws from 'ws';

import { Rpc,
        SEND_RPC } from '../types/rpc';

export const sendRpc = (rpc: Rpc, socket: ws): ThunkAction<void,
                                                            TAppState,
                                                            any,
                                                            AnyAction> =>
  (dispatch: TDispatch, /*getState: TGetState*/) => {     // nameless functions

    // const socket = getState().socket;

      if(isJSON(JSON.stringify(rpc)) === false) {
        logger.info(JSON.stringify(rpc));
      }

      const data = JSON.stringify({
        ...rpc
      });
      console.log('in send rpc');
      console.log(rpc);
      console.log('---');

      dispatch({ type: SEND_RPC, rpc });
      return socket.send(data);

  }
