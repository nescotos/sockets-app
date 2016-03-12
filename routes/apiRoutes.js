var bodyParser = require('body-parser');
var Notification = require('../models/notifications')
var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function(express, io) {
  //Creating API Router
  var apiRouter = express.Router();
  //API Middleware
  apiRouter.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //Decoding token
    if(token){
      //Verifying the token
      jwt.verify(token, config.superSecret, function(err, decoded){
        if(err){
          res.status(403).send({
            success: false,
            message: 'Failed to Authenticate'
          });
        }else{
          req.decoded = decoded;
          console.log('User',decoded.userName,'is requesting!');
          next();
        }
      });
    }else{
      res.status(403).send({
        success: false,
        message: 'You need a token'
      });
    }
  });
  //My info
  apiRouter.get('/me', function(req, res){
    console.log(req.decoded.userName,'requesting info')
    res.send(req.decoded);
  })
  //API Endpoints
  apiRouter.route('/notifications')
  .get(function(req, res){
    console.log('Reading the notifications');
    Notification.find({userNameReceiver: req.decoded.userName}, function(err, notifications){
      if(err){
        res.send(err);
      }
      res.json(notifications);
    });
  })
  .post(function(req, res){
    console.log('Storing the notifications');
    var notification = new Notification();
    notification.userNameSender = req.decoded.userName;
    notification.userNameReceiver = req.body.userNameReceiver;
    notification.title = req.body.title;
    notification.content = req.body.content;
    notification.save(function(err){
      if(err){
        return  res.send(err);
      }
      res.json({
        success: true,
        message: 'Notification sent'
      });
    });
  });
  //Returning apiRouter
  return apiRouter;
};
