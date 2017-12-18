var db = require('../models');


module.exports = function(app) {

//login route




//associate route




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




}
