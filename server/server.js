const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const isRealString = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
// configuring server to use socketIO
var io = socketIO(server); // returns websocket server
var users = new Users();

// makes this folder available on root route ("/")
app.use(express.static(publicPath));

// listens for an event
// passes socket to the callback
io.on('connection', (socket) => {
  console.log('new user connected');
  // // send to all connected users expect user that triggered the emit
  // socket.broadcast.emit('newMessage', generateMessage('Admin', "New user joined"));
  // // sends to user that triggered the 'connection' event
  // // NOTE: use io.emit() to emit to everyone
  // socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'))

  socket.on('join', (params, callback) => {
    // validating params
    if(!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room, (err) => {
      // socket.leave() to leave the room
      if(err) return console.error(err);

      users.removeUser(socket.id);
      users.addUser(socket.id, params.name, params.room);

      io.in(params.room).emit('updateUserList', users.getUserList(params.room));
      socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
      socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    });
    // socket.to(params.room).emit('updateUserList', users.getUserList(params.room));


    callback();
  });

  socket.on("createMessage", (message, callback) => {
    // console.log("createMessage", JSON.stringify(message, undefined, 2));
    io.emit('newMessage', generateMessage(message.from, message.text)); // emit to every connected user
    callback(); // sends an event back to client, and calls the callback in client side
  });

  socket.on("createLocationMessage", (coords) => {
    io.emit('newLocationMessage', generateLocationMessage("Admin", coords.latitude, coords.longitude))
  });

  socket.on('disconnect', (reason) => {
    console.log("User has disconnected");
    var user = users.removeUser(socket.id);

    if(user){
      socket.leave(user.room, () => {
        io.in(user.room).emit('updateUserList', users.getUserList(user.room));
        io.in(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the building`));
      });
    }
  })

});


server.listen(port, () => {
   console.log(`server is up on ${port}`)
});
