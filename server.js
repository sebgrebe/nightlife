//Package dependencies
var express = require('express')
var path = require('path')
// var passport = require('passport')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var cors = require('cors')

//File dependencies
var index = require('./routes/index');
var users = require('./routes/users');
var ConfigDB = require('./config/db.js')

//Other vars
var port = process.env.PORT || 3001;
var app = express();


//configure database
mongoose.connect(ConfigDB.url)

//set up app
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //log requests to console
app.use(bodyParser.json()); //handle json data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); //read cookies (needed for auth)

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
}

//To prevent errors from Cross Origin Resource Sharing, we will set
//our headers to allow CORS with middleware like so:
app.use(cors({credentials: true, origin: true}))

module.exports = app;

// load our routes and pass in our app
require('./routes/routes.js')(app);

app.listen(port, function() {
 console.log(`api running on port ${port}`);
});
