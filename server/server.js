const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io')

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

  socket.emit("newEmail", {
    from: 'test@example.com',
    text: 'Hey lil bud',
    createdAt: new Date().toString()
  });

  socket.on("createMessage", (data) => {
    console.log(JSON.stringify(data, undefined, 2));
  });

  socket.on('disconnect', () => console.log("client disconnected"));

  socket.emit('newMessage', {
    from: 'me',
    text: "lorem ipsum argee to disagree",
    createdAt: new Date().toString()
  });

});


server.listen(port, () => {
   console.log(`server is up on ${port}`)
});
