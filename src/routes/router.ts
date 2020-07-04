import express from 'express';
import expressWs from 'express-ws';
import SocketController from '../controllers/SocketController';

expressWs(express());
const roomRouter = express.Router();

roomRouter.ws(
    '/:id', SocketController

);

export default roomRouter
