const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');

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

  socket.broadcast.emit('newMessage', generateMessage('Admin', "New user joined"));

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.on("createMessage", (message, callback) => {
    console.log("createMessage", JSON.stringify(message, undefined, 2));
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback(); // sends an event back to client, and calls the callback in client side
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude))
  });

  socket.on('disconnect', () => console.log("client disconnected"));

});


server.listen(port, () => {
   console.log(`server is up on ${port}`)
});
