var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // root loads login html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });


  app.get('/landingPage', function(req,res){
  	res.sendFile(path.join(__dirname, "../public/landingPage.html"));
  });

  


};