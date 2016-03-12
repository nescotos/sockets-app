/*
  Importing express, morgan and socketIO
*/
var express = require('express');
var app = express();
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');
var socket = require('./routes/socket')

//Use bodyParser so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Loggin all requests to the console
app.use(morgan('dev'));

//Enabling CORS
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

// Setting the assets forlder
app.use(express.static(__dirname + '/public'));

//Connecting to database
mongoose.connect(config.database);


var server = app.listen(config.port);
var io = require('socket.io')(server);
//Initiliazing socket
io.sockets.on('connection', socket);
//Calling apiRouter
var apiRouter = require('./routes/apiRoutes')(express, io);
app.use('/api', apiRouter);
//Calling authRouter
var authRouter = require('./routes/authRoutes')(express, io);
app.use('', authRouter);
//Index route
app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});




console.log('Server Running on 8080');
