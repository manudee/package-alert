var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require('express-handlebars');
var app = express();
var PORT = process.env.PORT || 8080;

const nodemailer = require('nodemailer');

var db = require("./models");

//bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//handlebar settings
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.static("public"));


 require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
//require("./routes/associates-api-routes.js")(app);
require("./routes/residents-api-routes.js")(app);


db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
