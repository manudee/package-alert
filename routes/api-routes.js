var db = require('../models');
var passport = require("passport");
var pass = require('../config/passport/passport.js')(passport, db.User);


module.exports = function(app) {

//associate get route
app.get("/api/packages/associate", function(req, res) {
		//joins
		
		Promise.all([

		db.Package.findAll({
			include: [
				{
					model: db.User, 
						include: [
					 		{
					 			model: db.UserInfo
					 		}
					 	]
				}
			]
		}).then(function(dbPackage){
			return dbPackage
		}),
		db.User.findAll({
							include : [
							{
								model:db.UserInfo
							}
							]
						}).then(function(dbDropdown){
								console.log(dbDropdown);
								return dbDropdown
							})




		]).then(function(result) {
			
    		res.render("associates-block", 
    			{'dbPackage':result[0],
    			'dbDropdown':result[1]	
    	});

    		

		})



	})


//associate put route
app.put('/api/packages/associate/:id', function(req,res){



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
				id: req.params.id
			}

		}).then(function(updatedPackage){
			res.json(updatedPackage);



		});








	});



//resident get route
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

		

			// res.json(dbPackage.name);
		
			
			let packages = {packages: dbPackage.Packages, name: dbPackage.name};
			res.render('residents-block', packages);
			// res.json(dbPackage);
		

		});

	});

//resident put route

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
