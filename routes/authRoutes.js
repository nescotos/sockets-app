var User = require('../models/users');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var config = require('../config');
module.exports = function(express, io){
  //Creating Auth API
  var authRouter = express.Router();
  //Creating API Endpoints
  //Creating Login
  authRouter.route('/auth')
  .post(function(req, res){
    //Finding the user
    User.findOne({userName : req.body.userName})
    .select('userName password').exec(function(err, user){
      if(err){
        throw err;
      }
      //Do the user exist?
      if(!user){
        res.json({
          success: false,
          message: 'Invalid username or password'
        });
      } else if(user){
        var validPassword = user.comparePassword(req.body.password);
        if(!validPassword){
          res.json({
            success: false,
            message: 'Invalidad username or password'
          })
        }else{
          //Creating Token
          var token = jwt.sign({
	        	userName: user.userName
	        }, config.superSecret, {
	          expiresIn: 60 * 60 * 24 // expires in 24 hours
	        });
          //Response
          res.json({
            success: true,
            message: 'Login successful',
            token: token
          });
        }
      }
    });
  });

  authRouter.get('/api/me', function(req, res){
    console.log(req.decoded.userName,'requesting info')
    res.send(req.decoded);
  })

  authRouter.post('/register',function(req, res) {
			var user = new User();		// create a new instance of the User model
			user.userName = req.body.userName;  // set the users username (comes from the request)
			user.password = req.body.password;  // set the users password (comes from the request)
			user.save(function(err) {
				if (err) {
					// duplicate entry
					if (err.code == 11000)
						return res.json({ success: false, message: 'Username must be unique'});
					else
						return res.send(err);
				}
				// return a message
				res.json({ message: 'User created' });
			});
		});

  return authRouter;
}
