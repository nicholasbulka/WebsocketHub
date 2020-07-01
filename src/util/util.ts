import logger from './logger';

const isJSON = (str : string|ArrayBuffer|Buffer|Buffer[]) => {
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

export {isJSON};
