import express from 'express';
import expressWs from 'express-ws';
import logger from '../util/logger'

const wsInstance : expressWs.Instance = expressWs(express());
const socketRouter = express.Router();

socketRouter.ws(
    '/:id',
    (socket, req, next) => { next(); },
    (socket, req, next) => {
        socket.send(req.params.id);

        socket.on('close', (code, reason) => {
          logger.log('info', 'coder %s', code);
          logger.log('info', 'reason %s', reason);
        });
    }
);

export default socketRouter
