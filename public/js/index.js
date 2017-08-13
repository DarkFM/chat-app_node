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

socket.on('newLocationMessage', function (message) {
  var li = document.createElement('li');
  var a = document.createElement('a');
  a.textContent = 'My current location';
  li.textContent = message.from + " ";
  a.setAttribute('href', message.url);
  a.setAttribute("target", "_blank")
  li.appendChild(a);
  document.getElementById("messages").appendChild(li);
})

// event handler for FORM
var form = document.getElementById("message-form");
document.addEventListener('submit', function (ev) {
  ev.preventDefault();
  var messageTextbox = document.querySelector('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.value
  }, function () {
    messageTextbox.value = '';
  });
});

// event handler for LOCATION BUTTON
var locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', function (ev) {
  if(!("geolocation" in navigator)){
    return alert('Geolaction not supportd by your browser')
  }

  // disable button while waiting for location data
  locationButton.setAttribute("disabled", "true");
  locationButton.style.cursor = "progress";
  locationButton.textContent = 'Sending location...';

  navigator.geolocation.getCurrentPosition(function success(position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
    locationButton.removeAttribute("disabled");
    locationButton.style.cursor = "pointer";
    locationButton.textContent = 'Send location';


    console.log(position);
  }, function errHandler() { // fires on return ack from server
    locationButton.removeAttribute("disabled");
    locationButton.style.cursor = "pointer";
    locationButton.textContent = 'Send location';
    console.error("unable to fetch location");
  })
})
