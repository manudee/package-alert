var db = require('../models');
var passport = require("passport");
var pass = require('../config/passport/passport.js')(passport, db.User);

module.exports = function(app) {


	app.get("/api/packages/resident", function(req,res){
		console.log("is resident api",req.user);


		db.User.find({
			where: {
				id: req.user.id
			},
			include:
			{
				model: db.Package
			}

		}).then(function(dbPackage){

		

	
		
			
			let packages = {packages: dbPackage.Packages};
			res.render('residents-block', packages);
			// res.json(dbPackage);
		

		})



	});


	app.put('/api/residents/packages/:id', function(req,res){



		console.log("Request is " , req.body);
		console.log("Request picked up date is " , req.body.pickUpDate);


		console.log("Request status is " , req.body.status);
		console.log("Req user is " , req.user.id)

		db.Package.update({
			pickUpDate: req.body.pickUpDate,
			status: req.body.status,
			updater: req.user.name
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