var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var notificationSchema = new Schema({
  title: {type: String, required: true},
  content: {type: String, required: true},
  userNameSender: {type: String, required: true},
  userNameReceiver: {type: String, required: true},
  createdAt: {type: Date, required: true, default: Date.now}
});

module.exports = mongoose.model('Notification', notificationSchema);
