var db = require('../models');


module.exports = function(app) {

//login route




//associate route
	app.get("/api/associate/packages", function(req, res) {
		
		db.Package.findAll({
			include: [
				{
					model: db.UserInfo, 
						include: [
					 		{
					 			model: db.Packge
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

