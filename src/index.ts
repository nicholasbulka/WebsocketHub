import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as dotenv from "dotenv";
import expressWs from 'express-ws';
import express from 'express';
import winston from 'winston';

dotenv.config();

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
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

const { app, getWss, applyTo } : expressWs.Instance = expressWs(eApp, server);

applyTo({
    get() { return this; }
});

getWss().clients.forEach(ws => {
    if (ws.readyState !== ws.OPEN) {
        ws.terminate();
        return;
    }
    ws.ping();
});

app.ws('/', (ws, req) => {
    ws.on('message', msg => {
        ws.send('got it');
        // info: test message my string {}
        logger.log('info', 'test message %s', 'my string');
    });
});
