import * as fs from 'fs';
import * as http from 'http';
import * as https from 'https';
import * as dotenv from "dotenv";
import expressWs from 'express-ws';
import express from 'express';
import roomRouter from './routes/router';
import ticketRouter from './routes/ticket';
import { validateHeader } from './validation/header';


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
server.on('upgrade', (request, socket, head) => {

  console.log(request.headers.authorization);

  const validationResult = validateHeader(request.headers.authorization);
  if (!validationResult){
      socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
      socket.destroy();
      return;
    }

});

server.listen(process.env.PORT);
eApp.listen(process.env.PORT2);

const wsInstance : expressWs.Instance = expressWs(eApp, server);

wsInstance.app.use('/room', roomRouter);
eApp.use('/ticket', ticketRouter);
