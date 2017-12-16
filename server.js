var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var app = express();
var PORT = process.env.PORT || 8086;
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
//app.use(bodyParser.text());
//app.use(bodyParser.json({ type: "application/vnd.api+json" }));
// For Passport


//handlebar settings
//app.set('views', path.join(__dirname, 'views/layouts'));
app.use(express.static("public"));
app.set("view engine", "handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));





// require("./routes/api-routes.js")(app);
require('./config/passport/passport')(passport, db.User);
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

require("./routes/api-package-alert.js")(app);

var authroute = require('./routes/auth.js')(app,passport);




//require("./routes/associates-api-routes.js")(app);

require("./routes/residents-api-routes.js")(app);



db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
