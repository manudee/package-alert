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
			// res.json(dbPackage);
    		res.render("associates-block", 
    			{'dbPackage':result[0],
    			'dbDropdown':result[1]	
    	});

    		// 	app.get("/api/packages/associate", function(req, res) {

    				

						//   console.log('dropdown',dbDropdown);
						//   res.json(dbDropdown);
						//   res.render("associates-block", {'dbDropdown':dbDropdown});

						// })


    		// 	


		})



	})

// Promise.all([
//   User.findAll().then(function(users){
//     return users;
//   }),
//   Packages.findAll().then(function(packages){
//     return packages;
//   })
// ]).then(function(result){
//   //Render handlebars with users and packages data
//   res.render('index', {
//     'users':result[0],
//     'packages':result[1]
//   });
// }).catch(function(err){
//   //Returns first promise failure and doesn' render anything.
//   res.status(500);
//   res.send(err)
// })









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
