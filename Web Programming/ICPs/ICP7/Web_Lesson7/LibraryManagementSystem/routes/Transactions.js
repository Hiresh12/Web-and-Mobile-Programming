var express = require('express');
var router = express.Router();
var Transactions = require('../models/Transactions.js');


/*router.get('/', function (req, res, next) {
  Transactions.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});*/
router.get('/:id', function (req, res, next) {
  Transactions.find({"AccountNumber":req.params.id}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/* SAVE BOOK */
router.post('/', function (req, res, next) {
  var count=0;
  console.log('add');
  Transactions.find(function (err, products) {
    if (err) return next(err);
    console.log(products);
    count=products.length;
    req.body["TransactionID"]="T00"+count;
    Transactions.create(req.body, function (err, post) {
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
