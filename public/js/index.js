var socket = io(); // initiating the request from client to the server to
                    // a websocket and to keep connection open
socket.on('connect', function() {
  console.log('connected to server');

});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('adminMessage', function (message) {
  console.log(JSON.stringify(message, null, 2));
});

socket.on('newUser', function (mssg) {
  console.log(mssg.text);
});

socket.on('newMessage', function (email) {
  console.table([email]);
});
