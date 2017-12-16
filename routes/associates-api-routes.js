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


// create

//ted
app.post("/api/create",function(req,res){
	// console.log("111",req)
	//need to do something like db.Package.findAll then put it in the dropdown
	db.Package.create({
		packageName :req.body.packageName,
		creator:req.user.name,
		UserId :req.body.Rid})
	.then(function(result){	
		// if(Error){
		// 	console.log('sadfasfasdfsdf')
		// } 
		res.redirect('/api/packages/associate')
	})
})

};