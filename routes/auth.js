var authcontroller = require('../controllers/login_controller.js');
//var db =require('../models');



module.exports = function(app,passport){


	//app.get('/signup', authcontroller.signup);

app.get('/landingPage', function(req,res){
	console.log("hey it worked");
	console.log(req.user);
	res.render('temp')
});


	// app.get('/', r.signin);
	app.get('/', function(req, res) {
		res.render('login')
	})


	app.post('/authenticate', passport.authenticate('local-signin',{
			successRedirect:"/landingPage",
			failureRedirect:"/"

		})
	)

	app.get('/signout',function(req,res){
		req.session.destroy(function(err){
			res.redirect('/');
		})
	})
}

//res.redirect('/landingPage')