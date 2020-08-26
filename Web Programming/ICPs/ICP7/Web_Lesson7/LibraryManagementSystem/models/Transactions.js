var mongoose = require('mongoose');

var TransactionSchema = new mongoose.Schema({
  TransactionID: String,
  AccountNumber: String,
  Date: {type:String,default:Date.now()},
  Amount:{type:String,default:"5000"},
  Type: {type:String,default:"Deposit"},
});

module.exports = mongoose.model('Transactions', TransactionSchema);
