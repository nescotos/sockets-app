/*
  Importing express, morgan and socketIO
*/
var express = require('express');
var app = express();
var io = require('socket.io');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');
var mongoose = require('mongoose');

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

//Calling apiRouter
var apiRouter = require('./routes/apiRoutes')(express);
app.use('/api', apiRouter);
//Calling authRouter
var authRouter = require('./routes/authRoutes')(express);
app.use('', authRouter);
//Index route
app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(config.port);

console.log('Server Running on 8080');
