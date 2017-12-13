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
			res.json(dbPackage);
		})
	})



//residents route
app.get("/api/residents/:id/packages", function(req,res){

	db.Package.findAll({
		include:
		{
			model: db.User,


		},
		 where: {
        id: req.params.id
      }
      
	}).then(function(dbPackage){
		res.json(dbPackage);
	})

})







};

