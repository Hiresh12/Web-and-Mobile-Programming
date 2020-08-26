var express = require('express');
var router = express.Router();
var JointAccounts = require('../models/JointAccountDetails.js');

/*/!* GET ALL BOOKS *!/
router.get('/', function (req, res, next) {
  Accounts.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});*/
router.get('/userid/:username', function (req, res, next) {
  console.log('joint',req.params.username);
  JointAccounts.find({ $or: [ { AccountNumber1: req.params.username  }, { AccountNumber2: req.params.username } ] }, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/:id', function (req, res, next) {
  JointAccounts.find({"JointAccountNumber":req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE BOOK */
router.post('/', function (req, res, next) {
  var count=0;
  console.log('add');
  JointAccounts.find(function (err, products) {
    if (err) return next(err);
    console.log(products);
    count=products.length;
    req.body["JointAccountNumber"]="J100"+count;
    JointAccounts.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
});

/*/!* UPDATE BOOK *!/
router.put('/:id', function (req, res, next) {
  console.log("body------------",req.body);
  var myquery = {_id: req.params.id};
  var newvalues = { $set: req.body };
  Accounts.updateOne(myquery, newvalues, function (err, post) {
    if (err)  {console.error(err);return next(err)}
    res.json(post);
  });

});*/
/*/!* DELETE BOOK *!/
router.delete('/:id', function (req, res, next) {
  console.log("entered");
  var myquery = {_id: req.params.id};
  Accounts.deleteOne(myquery, function (err, post) {
    if (err)  {console.error(err);return next(err)}
    res.json(post);
  });
});*/

module.exports = router;
