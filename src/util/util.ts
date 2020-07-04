import logger from './logger';
import { Item } from '../store/types/util';

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

    const rand = Math.floor(Math.random() * 10000).toString();
    if (restricted.filter(e => e.itemId === rand).length > 0) {
        return rand.toString();
    } else {
        return randomItemId(restricted);
    }
}
