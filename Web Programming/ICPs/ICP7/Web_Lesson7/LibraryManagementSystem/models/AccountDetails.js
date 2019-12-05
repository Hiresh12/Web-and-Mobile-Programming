var mongoose = require('mongoose');

var AccountSchema = new mongoose.Schema({
  username: String,
  AccountNumber: String,
  Balance: {type:String,default:"10000"},
  Type: {type:String,default:"Savings"},
});

module.exports = mongoose.model('Accounts', AccountSchema);
