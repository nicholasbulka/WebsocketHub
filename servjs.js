const fs = require('fs');
const http = require('http');
const https = require('https');
require('dotenv').config();
const WebSocket = require('ws');


let server =  http.createServer();

if(process.env.ENV == 'production'){
  server = https.createServer({
    cert: fs.readFileSync(process.env.FULLCHAIN),
    key: fs.readFileSync(process.env.KEY)
  });
}

if(process.env.ENV == 'local' && process.env.USESSL == 'yes'){

  server = https.createServer({
    cert: fs.readFileSync('/usr/local/etc/ssl/certs/self-signed.crt'),
    key: fs.readFileSync('/usr/local/etc/ssl/private/self-signed.key')
  });
}


wsserver = new WebSocket.Server({ host:process.env.WSURL, server: server });
wsserver.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wsserver.clients.forEach(function each(client) {
      if (client !== ws && client.readyState == WebSocket.OPEN) {
        client.send(data);
      }
    });
    console.log('received: %s', data);
  });

  ws.send('something in servjs');
});

server.listen(3001);
console.log('listening');
