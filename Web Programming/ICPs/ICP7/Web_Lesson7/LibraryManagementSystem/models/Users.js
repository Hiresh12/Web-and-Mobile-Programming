var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  username: String,
  password: String,
  /*published_year: String,
  publisher: String,
  updated_date: {type: Date, default: Date.now},*/
});

module.exports = mongoose.model('Users', UserSchema);
