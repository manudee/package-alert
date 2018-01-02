var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var app = express();
var PORT = process.env.PORT || 8081;
var env = require('dotenv').load();
var db = require("./models");
var passport = require("passport");
var session = require("express-session");
var path = require("path");

app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); 
// session secret
 
app.use(passport.initialize());
 
app.use(passport.session());


const nodemailer = require('nodemailer');



//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// For Passport


//handlebar settings

app.use(express.static("public"));
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));


app.use(express.static(path.join(__dirname, '/public/assets/css')));


require('./config/passport/passport')(passport, db.User);

require("./routes/api-routes.js")(app);

var authroute = require('./routes/auth.js')(app,passport);





db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
