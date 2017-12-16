var db = require('../models');


module.exports = function(app) {

//login route




//associate route
app.get("/api/associate/packages", function(req, res) {
		//joins 
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
		}).then(function(dbPackage) {
			// res.json(dbPackage);
			console.log(dbPackage);
    		res.render("index", dbPackage);
		})

	})

	app.put('/api/associates/packages/:id', function(req,res){



		console.log("Request is " , req.body);
		console.log("Request picked up date is " , req.body.pickUpDate);


		console.log("Request status is " , req.body.status);
		console.log("Req user is " , req.params.id)

		db.Package.update({
			pickUpDate: req.body.pickUpDate,
			status: req.body.status,
			updater: req.user.name
		},

		{
			where: {
				// userid: req.user.id,
				id: req.params.id
			}

		}).then(function(updatedPackage){
			res.json(updatedPackage);



		});








	});





};


