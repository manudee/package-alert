var db = require('../models');


module.exports = function(app) {

	app.get("/api/residents/:id/packages", function(req,res){

		var condition = req.params.id;




		db.User.find({
			where: {
				id: req.params.id
			},
			include:
			{
				model: db.Package
			}

		}).then(function(dbPackage){
			// res.json(dbPackage);

	
		
			
			let packages = {packages: dbPackage.Packages};
			// res.json(packages);
			res.render('index', packages);

		

		})



	});




	app.put('/api/residents/:id/packages', function(req,res){

		db.Package.update({
			pickUpDate: '12/14/2017',
			status: 0
		},

		{
			where: {
				id: 1
			}

		}).then(function(updatedPackage){
			res.json(updatedPackage);



		});








	});

}