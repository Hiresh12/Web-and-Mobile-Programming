var createError = require('http-errors');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');

var mongoose = require('mongoose');

mongoose.connect('mongodb://Hiresh12:Hraccount2k19@ds151383.mlab.com:51383/home_security',
  {useNewUrlParser: true },function(err){
    if(err) {
      console.log('Some problem with the connection ' +err);
    } else {
      console.log('The Mongoose connection is ready');
    }
  });
// mongoose.connect('mongodb://Hiresh12:Hraccount2k19@ds151383.mlab.com:51383/home_security')
//   .then(() => console.log('connection successful'))
//   .catch((err) => console.error(err));

var userRouter = require('./routes/Users');
var accountRouter = require('./routes/AccountDetails');
var transactionRouter = require('./routes/Transactions');
var jointaccountRouter = require('./routes/JointAccountDetails');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'dist/mean-angular6')));
app.use('/homePage', express.static(path.join(__dirname, 'dist/mean-angular6')));


app.use('/user',userRouter)
app.use('/account',accountRouter)
app.use('/transaction',transactionRouter)
app.use('/jointaccount',jointaccountRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err.status);
});

module.exports = app;
