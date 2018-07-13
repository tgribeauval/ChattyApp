// server.js

const express = require('express');
const SocketServer = require('ws');
const uuidv4 = require('uuid/v4');
// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer.Server({ server });


wss.broadcast = function broadcast(data) { // data is what we are sending from App.jsx to servr
  wss.clients.forEach(function each(client) { // looping through each client connected to the server
      client.send(data); // sending the data to each client
  });
};

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  wss.clients.forEach(client=>{
    console.log('readyState: '+client.readyState);
    console.log('SocketOpen: '+ SocketServer.OPEN)
    if(client.readyState === SocketServer.OPEN){ // if client is ready to receive messages, SocketServer represents the status of the server when a client is connected
      client.send( // when client is connect run send the folling code to the App.jsx file
        JSON.stringify({ // stringify it
          type: 'usersOnline', // set a type
          userslength: wss.clients.size // many how clients are connected to the server
        })
      )
    }
  })

ws.on('message', function(message) { // when the server receives a message, run this function:
  let msg = JSON.parse(message) // create a variable turns the message string into an object
  msg["id"]= uuidv4() // add a unique identifier to this object
  switch(msg.type) { // sort of like an if statement, switch is checking the type of the msg
    case 'postMessage': // if the type is 'postMesssge'
      msg.type = 'incomingMessage'; //set its type to incomingMessage
    break; // break out of this function if condition is true
    case 'postNotification': //same concept as above
      msg.type = 'incomingNotification';
    break;
    default: // if none of the conditions are found, run this:
    throw new Error("Unknown event type" + message.type )
  }
  wss.broadcast(JSON.stringify(msg)) // refers to function on line 19
  console.log('msg', msg);
})
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => console.log('Client disconnected'));
});
