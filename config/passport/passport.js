var bCrypt = require('bcrypt-nodejs');
var db =require('../../models');


//test bcrypt
//isloggedin


module.exports = function(passport, user) {
 var user = db.User;
    var LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser(function(user,done){
    	console.log("i in serialize",user)
    	done(null,user.id);
    });

    passport.deserializeUser(function(id,done){
    	db.User.findById(id).then(function(user){
    		if(user){
    			done(null,user.get());
    		}
    		else{
    			done(user.errors,null);
    		}
    	});
    });


    passport.use('local-signin', new LocalStrategy(
 
    {
        usernameField: 'user',
        passwordField: 'pass',
        passReqToCallback: true // allows us to pass back the entire request to the callback
 
    },

    function(req,user,pass,done){

    	 db.User.findOne({
    	 	where:{
    	 		uid:user
    	 	}
    	 }).then(function(userM){
    	 	if(!userM){
    	 		return done(null,false);
    	 		console.log("no user");
    	 	}

    	 	if(userM.pwd !== pass){
    	 		return done(null,false)
    	 		console.log("wrong password");
    	 	}


    	 	var userInfo = userM.get();
    	 	console.log("In passport.js",userInfo);

    	 	return done(null,userInfo);
    	 })


    }


 
));


}