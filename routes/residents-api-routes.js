var db = require('../models');


module.exports = function(app) {

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

});

app.post("/api/packages/", function(req,res){

console.log(req.body);
// db.Package.create({
// 	packageName: req.body.packageName,
// 	status: req.body.status,
// 	creator: req.body.User.uid,
// 	updater: req.body.User.uid,
// 	pickUpDate: req.body.pickUpDate
// }).then(function(dbPackage){
// 	console.log(dbPackage);
// })


})



}