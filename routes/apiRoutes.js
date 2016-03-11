var bodyParser = require('body-parser');
var Notification = require('../models/notifications')
var jwt = require('jsonwebtoken');
var config = require('../config');

module.exports = function(express) {
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
  //API Endpoints
  apiRouter.route('/notifications')
  .get(function(req, res){
    console.log('Reading the notifications');
    res.send('Notifications Area');
  })
  .post(function(req, res){
    console.log('Storing the notifications');
    res.send('Notifications Storage Area')
  });
  //Returning apiRouter
  return apiRouter;
};
