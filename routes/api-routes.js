var db = require('../models');


module.exports = function(app) {

//login route




//associate route




app.get("/api/packages/associate", function(req, res) {
		//joins
		// db.Package.findAll({

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
			//res.json(dbPackage);
    		res.render("associates-block", {'dbPackage':dbPackage});
		})
	})
}
