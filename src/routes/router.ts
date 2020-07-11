import express from 'express';
import expressWs from 'express-ws';
import SocketController from '../controllers/SocketController';
import RoomController from '../controllers/RoomController';


expressWs(express());
export const roomRouter = express.Router();
export const socketRouter = express.Router();

/*
socketRouter.ws(
    '/:id', RoomController

);*/

socketRouter.ws(
    '/:id/:userId', SocketController

);

export default socketRouter
