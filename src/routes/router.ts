import express from 'express';
import logger from '../util/logger'

const router = express.Router();
router.ws(
    '/:id',
    (socket, req, next) => { next(); },
    (socket, req, next) => {
        socket.send(req.params.id);

        socket.on('close', (code, reason) => {
          logger.log('info', 'code %s', code);
          logger.log('info', 'reason %s', reason);
        });
    }
);

export default router
