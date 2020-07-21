import 'express-serve-static-core';
import { WebSocket } from 'ws';

declare module 'express-serve-static-core' {
  interface Request {
    redisStore?: string | boolean | null
  }
}

interface IdWebSocket extends WebSocket {
    socketId: string;
}
