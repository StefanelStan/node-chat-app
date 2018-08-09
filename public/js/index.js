var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage){
    console.log('Client browser will render new message', newMessage);
    var li = jQuery('<li></li>');
    li.text(`From: ${newMessage.from} -> ${newMessage.text} at ${newMessage.createdAt}`);

    jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function(newLocationMessage){
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');
    li.text(`From: ${newLocationMessage.from}: `);
    a.attr('href', newLocationMessage.url)
    li.append(a);
    jQuery('#messages').append(li);
});

// socket.emit('createMessage', 
//             {from: 'Frank',text: 'Hi'}, 
//             function(status){
//                 console.log(status);
//             });
         
jQuery('#message-form').on('submit', function(e){
    e.preventDefault();

    socket.emit('createMessage', {
        from: socket.id,
        text: jQuery('[name=message]').val()
    }, function(){

    });
});           

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
    if (!"geolocation" in navigator) {
        return alert('Gelocation is NOT supported by your browser!');
    }
    navigator.geolocation.getCurrentPosition(function (position) {
        console.log(position);
        
        socket.emit('locationMessage', {
            from: socket.id,
            lat: position.coords.latitude,
            lng: position.coords.longitude
        });
    }, function (error) {
        alert('Unable to fetch location');
    });
});