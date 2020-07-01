import express from 'express';
import expressWs from 'express-ws';
import logger from '../util/logger'
import RoomController from '../controllers/RoomController';
import { isJSON } from '../util/util';

const wsInstance : expressWs.Instance = expressWs(express());
const roomRouter = express.Router();


roomRouter.ws(
    '/:id', RoomController

);

export default roomRouter
