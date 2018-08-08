var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage){
    console.log('Client browser will render new message', newMessage);
});

socket.on('welcomeMessage', function(newMessage){
    console.log('Client browser will render new message', newMessage);
});
