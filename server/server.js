const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// configuring server to use socketIO
var io = socketIO(server); // returns websocket server

app.use(express.static(publicPath));

// listens for an event
// passes socket to the callback
io.on('connection', (socket) => {
  console.log('new user connected');

  socket.broadcast.emit('newUser', generateMessage('Admin', "New user joined"));

  socket.emit('newUser', generateMessage('Admin', 'Welcome to the chat app'))

  socket.on("createMessage", (message) => {
    console.log(JSON.stringify(message, undefined, 2));
    io.emit('newMessage', generateMessage(message.from, message.text));

    // send to everyone but the sender
  //   socket.broadcast.emit('newMessage', {
  //     from: message.from,
  //     text: message.text,
  //     createdAt: new Date().getTime()
  //   });
  });

  socket.on('disconnect', () => console.log("client disconnected"));

});


server.listen(port, () => {
   console.log(`server is up on ${port}`)
});
