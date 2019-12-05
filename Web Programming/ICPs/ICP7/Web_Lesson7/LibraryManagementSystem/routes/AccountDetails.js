var express = require('express');
var router = express.Router();
var Accounts = require('../models/AccountDetails.js');

/*/!* GET ALL BOOKS *!/
router.get('/', function (req, res, next) {
  Accounts.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});*/
router.get('/userid/:username', function (req, res, next) {
  Accounts.find({"username":req.params.username}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/:id', function (req, res, next) {
  Accounts.find({"AccountNumber":req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE BOOK */
router.post('/', function (req, res, next) {
  var count=0;
  console.log('add');
  Accounts.find(function (err, products) {
    if (err) return next(err);
    console.log(products);
    count=products.length;
    req.body["AccountNumber"]="I00"+count;
    Accounts.create(req.body, function (err, post) {
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
