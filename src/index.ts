import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as dotenv from "dotenv";
import * as ws from 'ws';
import expressWs from 'express-ws';
import express from 'express';
import logger  from './util/logger';
import socketRouter from './routes/router';

dotenv.config();

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


wsInstance.app.use('/socket', socketRouter);
