const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public/index.html');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

var io = socketIO(server);

app.get('/', (req, res) => {
    res.sendFile(publicPath);
  });

io.on('connection', (socket) =>{
    console.log('new user connected');

    socket.on('disconnect', ()=>{
        console.log('user disconnected');
    });
});



server.listen(port, (err, success) =>{
    console.log(`Listening on port ${port}`);
});
