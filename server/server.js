const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require("./utils/validation.js");
const {Users} = require('./utils/Users.js');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) =>{
    console.log('new user connected');

    // socket.emit('newMessage', generateMessage('Admin',`Welcome to the chap app user ${socket.id}`));
    // socket.broadcast.emit('newMessage', generateMessage('Admin',`Everyone ! User ${socket.id} has joined the chat app`));
    
    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and Room name are required');
        }
        //if valid params, join a room; socket.join('roomMane')/ socket.leave
        socket.join(params.room)
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', generateMessage('Admin',`Welcome to the chap app user ${params.name}`));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`Everyone ! User ${params.name} has joined the chat app`));
        callback();
    });

    socket.on('createMessage', (createMessage, callback) => {
        var user = users.getUser(socket.id);
        if (user && isRealString(createMessage.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, createMessage.text));
            callback();
        }
        /*
        io.emit('newMessage', {
            from: createMessage.from,
            text: createMessage.text,
            createdAt: new Date().getTime()
        });
        */
    });

    socket.on('locationMessage', (locationMessage, callback) => {
        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room)
              .emit('newLocationMessage', generateLocationMessage(user.name, locationMessage.lat, locationMessage.lng));
        }
    });

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
        var user = users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});



server.listen(port, (err, success) =>{
    console.log(`Listening on port ${port}`);
});
