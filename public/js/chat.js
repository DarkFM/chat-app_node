var socket = io(); // initiating the request from client to the server to
                    // a websocket and to keep connection open

function scrollToBottom() {
  // Selectors
  var messages = document.getElementById("messages");
  var newMessage = messages.lastElementChild;
  // Heights
  var clientHeight = messages.clientHeight;
  var scrollTop = messages.scrollTop;
  var scrollHeight = messages.scrollHeight;
  var newMessageHeight = newMessage.clientHeight;
  var lastMessageHeight = $(newMessage.previousElementSibling).innerHeight();
  // var newHeight = newMessage.previousElementSibling.clientHeight;

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop = scrollHeight;
  }
}

socket.on('connect', function() {
  var params = $.deparam(window.location.search);

  socket.emit('join', params, function (err) {
    if (err) {
      alert(err);
      // redirect user back to root page on err
      window.location.href = '/';
    } else {
      // console.log("No error");
    }
  });
});

socket.on('disconnect', function() {
  console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
  var ol = document.createElement('ol');

  users.forEach(function (user) {
    var li = document.createElement('li');
    li.textContent = user;
    ol.appendChild(li);
  });

  document.getElementById('users').innerHTML = ol.outerHTML;
  // selUsers.innerHTML = ol.innerHTML;
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = document.getElementById('message-template').innerHTML;
  // returns a html string
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  // NOTE: appendChild only appends a node, NOT a html string
  document.getElementById('messages').insertAdjacentHTML('beforeend', html);
  scrollToBottom();

  // var li = document.createElement('li');
  // li.textContent = `${message.from} ${formattedTime}: ${message.text}`;
  // document.getElementById("messages").appendChild(li);

});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = document.getElementById('location-message-template').innerHTML;
  var html = Mustache.render(template, {
    createdAt: formattedTime,
    from: message.from,
    url: message.url
  });

  document.getElementById('messages').insertAdjacentHTML('beforeend', html);
  scrollToBottom();
})

// event handler for FORM
var form = document.getElementById("message-form");
document.addEventListener('submit', function (ev) {
  ev.preventDefault();

  var messageTextbox = document.querySelector('[name=message]');
  socket.emit('createMessage', {
    text: messageTextbox.value
  }, function () {// fires on return ack from server
    messageTextbox.value = '';
  });
});

// event handler for LOCATION BUTTON
var locationButton = document.getElementById('send-location');
locationButton.addEventListener('click', function (ev) {
  if(!("geolocation" in navigator)){
    return alert('Geolocation not supportd by your browser')
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


    // console.log(position);
  }, function errHandler() {
    locationButton.removeAttribute("disabled");
    locationButton.style.cursor = "pointer";
    locationButton.textContent = 'Send location';
    console.error("unable to fetch location");
  })
})
