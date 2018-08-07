const path = require('path');
var express = require('express');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publicPath));

// hbs.registerPartials(publicPath);
// app.set('view engine', 'hbs');

// app.get('/', (request, response) =>{
//     response.send
// });

app.listen(port, (err, success) =>{
    console.log(`Listening on port ${port}`);
});
