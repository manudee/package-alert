var authcontroller = require('../controllers/login_controller.js');
//var db =require('../models');



module.exports = function(app,passport){


	



app.get('/decision', function(req, res) {
	if (req.user.position === 'Associate') {
		res.redirect('/api/packages/associate')
	}
	else {
		res.redirect('/api/packages/resident')
	}
})


	app.get('/', function(req, res) {
		res.render('login')
	})


	app.post('/authenticate', passport.authenticate('local-signin',{
			successRedirect:"/decision",
			failureRedirect:"/"

		})
	)

	app.get('/signout',function(req,res){
		req.session.destroy(function(err){
			res.redirect('/');
		})
	})
}

