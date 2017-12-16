var db = require('../models');
var passport = require("passport");
var pass = require('../config/passport/passport.js')(passport, db.User);

module.exports = function(app) {


// app.get('/api/residents', function(req,res){

// 	console.log(req.user);
	app.get("/landingPage/residents/packages/:id", function(req,res){
		console.log("is resident api",req.user);
	// req.params.id  = req.user.id;

		db.User.find({
			where: {
				id: req.params.id
			},
			include:
			{
				model: db.Package
			}

		}).then(function(dbPackage){
			//res.json(dbPackage);
			console.log(dbPackage)

	
		
			
			let packages = {packages: dbPackage.Packages};
			// res.json(packages);
			res.render('index', packages);

		

		})



	});


// })

	app.put('/api/residents/:id/packages', function(req,res){
        console.log("Request is " , req.body);
        console.log("Request picked up date is " , req.body.pickUpDate);
        console.log("Request status is " , req.body.status);
        console.log("Req user is " , req.user.id)
        db.Package.update({
            pickUpDate: req.body.pickUpDate,
            status: req.body.status
        },
        {
            where: {
                userid: req.user.id,
                id: req.params.id
            }
        }).then(function(updatedPackage){
            res.json(updatedPackage);
        });
    });

}