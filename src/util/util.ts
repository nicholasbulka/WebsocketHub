import logger from './logger';
import { Item } from '../store/types/util';
import { RpcDataPoint } from '../store/types/rpc';

export const isJSON = (str : string|ArrayBuffer|Buffer|Buffer[]) => {
    try {
        const obj = JSON.parse(str.toString());
        if (obj && typeof obj === 'object' && obj !== null) {
            return true;
        }
    } catch (err) {
      logger.log('info', 'catch error %s', err);
    }
    return false;
}

export const randomItemId = (restricted : Item[]) : string => {
    const rand = Math.floor(Math.random() * 1000000).toString();
    console.log(rand);
    if (restricted.filter(e => e.itemId === rand).length === 0) {
        return rand.toString();
    }

    else {
        return randomItemId(restricted);
    }
}

export const randomRpcId = (restricted : RpcDataPoint[]) : string => {

    const rand = Math.floor(Math.random() * 10000).toString();
    if (restricted.filter(e => e.rpcId === rand).length === 0) {
        return rand.toString();
    } else {
        return randomRpcId(restricted);
    }
}
