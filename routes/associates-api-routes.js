var db = require('../models');


module.exports = function(app) {



//ted
app.post("/api/create",function(req,res){
	db.Package.create({
		packageName :req.body.packageName,
		creator:req.user.name,
		UserId :req.body.residentList})
	.then(function(result){
		
	
		res.redirect('/api/packages/associate')
	})
})

};

