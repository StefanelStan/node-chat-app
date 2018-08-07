const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('new user connected');

    socket.emit('newEmail', {
        from: 'Mike@example.com',
        text: 'Hey, what\'s happenin?',
        createdAt: 123
    });

    socket.emit('newMessage', {
        from: 'Tony',
        text: 'Tony newMessage',
        createdAt: 12345
    });

    socket.on('createMessage', (createMessage) =>{
        console.log('Server received createMessage', createMessage);
    });

    socket.on('createEmail', (newEmail)=>{
        console.log('Server new email createEmail', newEmail);
    });


    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
});



server.listen(port, (err, success) =>{
    console.log(`Listening on port ${port}`);
});
