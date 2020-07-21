import logger from './logger';
import * as ws from 'ws';

export const isJSON = (str : string|ArrayBuffer|Buffer|Buffer[]) : boolean => {
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

export const getUserIdFromWS = (socket : ws, map : Map<string, ws>) : string | undefined => {

  let userId;
  map.forEach((value, key) => {
    if(value === socket){
      userId = key;
    }
  })

  return userId;
}
