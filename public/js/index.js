var socket = io(); // initiating the request from client to the server to
                    // a websocket and to keep connection open
socket.on('connect', function() {
  console.log('connected to server');

});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newEmail', function (email) {
  console.log('new Email', email);
})

socket.on('newMessage', function (email) {
  console.table([email]);
});
