import { sendRpc } from '../store/actions/rpc';
import { reducerStore } from '../store/reducers';
import * as ws from 'ws';

const CloseController = (socket : ws, code : number, reason : string ) : void => {
  const store = reducerStore();

  console.log(code);
  console.log(reason);

}

export default CloseController;
