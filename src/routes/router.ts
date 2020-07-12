import express from 'express';
import expressWs from 'express-ws';
import SocketController from '../controllers/SocketController';
import RoomController from '../controllers/RoomController';


expressWs(express());
const wsrouter = express.Router();


wsrouter.ws(
    '/:id', RoomController
);

wsrouter.ws(
    '/:id/:userId', SocketController
);



export { wsrouter }
