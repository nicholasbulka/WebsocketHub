import express from 'express';
import expressWs from 'express-ws';
import logger from '../util/logger'
import RoomController from '../controllers/RoomController';

const wsInstance : expressWs.Instance = expressWs(express());
const roomRouter = express.Router();


roomRouter.ws(
    '/:id', RoomController

);

export default roomRouter
