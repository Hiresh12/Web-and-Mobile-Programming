var mongoose = require('mongoose');

var JointAccountSchema = new mongoose.Schema({
  JointAccountNumber: String,
  AccountNumber1: String,
  AccountNumber2: String
});

module.exports = mongoose.model('JointAccounts', JointAccountSchema);
