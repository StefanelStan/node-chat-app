var socket = io();

socket.on('connect', function() {
    console.log('connected to server');
    //to automatically create it when connected
    socket.emit('createEmail', {
        to: 'Stefan@yahoo.com',
        text: 'Hey Read my email!'
    });

    socket.emit('createMessage', {
        from: 'Browser',
        text: 'Browser createMessage'
    });
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newEmail', function(email) {
    console.log('Client: New email', email);
});

socket.on('newMessage', function(newMessage){
    console.log('Client browser will render new message', newMessage);
});

