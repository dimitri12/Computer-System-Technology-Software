var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var path = require('path');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var gyp = require('node-gyp');
var sql = require('mysql');
var User = require('./user');


var connection = sql.createConnection({
    host: 'localhost',
    user: 'dimitri12',
    password: 'dFC2k7Ds8',
    database: 'kurs'
});
//connection.query();

// configuration ===============================================================
var configDB = require('./database');
mongoose.connect(configDB.url);
var requirejs = require('requirejs');
requirejs.config({
    baseUrl: 'C:/Users/dimitri/Documents/Visual Studio 2015/Projects/NodejsWebApp1/NodejsWebApp1/' ,
    
    nodeRequire: require
});

require('./logininit.js')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs'); // set up ejs for templating
    app.use(session({ secret: 'dimitri' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session
    
//app.use(flash());

app.use('/views' ,express.static(__dirname + '/views'));
// routes ======================================================================
require("./mainframe.js")(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);