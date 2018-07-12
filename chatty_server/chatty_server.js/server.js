// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
      client.send(data);
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');

ws.on('message', function(message) {
  let msg = JSON.parse(message)
  msg["id"]= uuidv4()
  switch(msg.type) {
    case 'postMessage':
      msg.type = 'incomingMessage';
    break;
    case 'postNotification':
      msg.type = 'incomingNotification';
    break;
    default:
    throw new Error("Unknown event type" + message.type )
  }
  wss.broadcast(JSON.stringify(msg))
  console.log('msg', msg);
})
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
