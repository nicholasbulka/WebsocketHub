import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as dotenv from "dotenv";
import * as ws from 'ws';
import expressWs from 'express-ws';
import express from 'express';
import winston from 'winston';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.simple()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

const eApp: express.Application = express();
let server: http.Server|https.Server = http.createServer();

const env = process.env.ENV;

switch(env){
  case 'production': {

    const fc : string = process?.env?.FULLCHAIN ?? '';
    const key : string = process?.env?.KEY ?? '';

    server = https.createServer({
      cert: fs.readFileSync(fc),
      key: fs.readFileSync(key)
    });
    break;
  }
  case 'localSSL': {
    server = https.createServer({
      cert: fs.readFileSync('/usr/local/etc/ssl/certs/self-signed.crt'),
      key: fs.readFileSync('/usr/local/etc/ssl/private/self-signed.key')
    });
    break;
  }
  default : {
    server = http.createServer();
  }

}

server.listen(process.env.PORT);

const wsInstance : expressWs.Instance = expressWs(eApp, server);


wsInstance.getWss().clients.forEach(socket => {
    if (socket.readyState !== ws.OPEN) {
        socket.terminate();
        return;
    }
    socket.ping();
});

wsInstance.app.ws('/', (socket, req) => {
    socket.on('message', msg => {
      logger.log('info', "received: %s", msg);
    });
});

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
wsInstance.app.use('/socket', router);
