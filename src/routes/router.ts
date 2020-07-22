import express from 'express';
import expressWs from 'express-ws';
import SocketController from '../controllers/SocketController';
import { redisClient } from '../index'

expressWs(express());
const wsrouter = express.Router();

const getRedisStore = async (key : string) => {
  return await redisClient.get(key);
}

wsrouter.use("/:roomId", async (req, res, next) => {
    const key = req.params.roomId;
    getRedisStore(key).then((result : string | boolean) => {
      req.redisStore = result;
      next();
    });
  })

wsrouter.ws(
    '/:roomId', SocketController
);


export { wsrouter }
