var db = require('../models');


module.exports = function(app) {

	app.get("/api/residents/:id/packages", function(req,res){

		var condition = req.params.id;

	// db.Package.findAll({
	// 	include:
	// 	{
	// 		model: db.User,


	// 	},
	// 	 where: {
 //        id: req.params.id
 //      }
 
	// }).then(function(dbPackage){
	// 	res.json(dbPackage);

	// })


	db.User.findAll({
		include:
		{
			model: db.Package,


		},
		where: {
			id: req.params.id
		}
		
	}).then(function(dbPackage){
		res.json(dbPackage);

	})



});




// app.put('/api/residents/:id/packages', function(req,res){

	
// })

}