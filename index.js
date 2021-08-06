const Socket = require('socket.io');
const express = require('express');
const cors = require('cors');
const fileupload = require('express-fileupload');
const webpack = require('webpack');
const WebpackDevMiddleware = require('webpack-dev-middleware');
const path = require('path');
const webpack_config = require('./webpack.config');
const morgan = require('morgan');
const auth = require('./routes/index');

const app = express();

// Setup:
app.set('port', process.env.PORT || 3000);
var corsOptions = {
    origin: 'http://localhost:3000/',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(express.static(path.join(__dirname, 'public')));

// Webpack:

app.use(WebpackDevMiddleware(webpack(webpack_config)));

// Middlewares:

app.use(cors(corsOptions));
app.use(fileupload());
app.use(morgan());
app.use((req, res, next) => {
    console.log(req.protocol.toUpperCase(), req.method.toLocaleUpperCase(), req.url);
    next();
});

// Routes:

app.use(auth);

// Startup:

const Server = app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});


// Websockets:

const io = Socket(Server);

io.on('connection', (socket) => {
    console.log('New Connection:', socket.id);
    var message = {};
    socket.on('msg', (msg) => {
        console.log(JSON.parse(msg));
        message = JSON.parse(msg);
        console.log(message);
        if(message != {}){
            io.emit('msg', JSON.stringify(message));
            message = {};
        }
    });
    
});