var socket = io(); // initiating the request from client to the server to
                    // a websocket and to keep connection open
socket.on('connect', function() {
  console.log('connected to server');

});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
  // console.table([message]);
  var li = document.createElement('li');
  li.textContent = `${message.from}: ${message.text}`;
  document.getElementById("messages").appendChild(li);

});


var form = document.getElementById("message-form");
document.addEventListener('submit', function (ev) {
  ev.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: document.querySelector("[name=message]").value
  }, function () {

  });
})
