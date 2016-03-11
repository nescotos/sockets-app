var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
  userName : {type: String, required: true, index: {unique: true}},
  password : {type: String, required: true, select: false }
});

//Hashing the password before the user is saved
userSchema.pre('save', function(next) {
	var user = this;

	//Hashing the password only if the password has been changed or user is new
	if (!user.isModified('password')) return next();

	//Generate the hash
	bcrypt.hash(user.password, null, null, function(err, hash) {
		if (err) return next(err);

		//Change the password to the hashed version
		user.password = hash;
		next();
	});
});

//Method to compare a given password with the database hash
userSchema.methods.comparePassword = function(password) {
	var user = this;

	return bcrypt.compareSync(password, user.password);
};


module.exports = mongoose.model('User', userSchema);
