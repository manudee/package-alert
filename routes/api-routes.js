var db = require('../models');


module.exports = function(app) {

//login route




//associate route
//console.log("outside",req.user);
	app.get("/api/:id/packages", function(req, res) {
		//joins

		console.log("inside",req.user);
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
			res.json(dbPackage);
		})
	})



//residents route








};

