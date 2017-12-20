var db = require('../models');
var passport = require("passport");
var pass = require('../config/passport/passport.js')(passport, db.User);
var helper = require('./route-helper.js');


module.exports = function(app) {

//Associate GET route ******************************************************************************************************************************
	app.get("/api/packages/associate",helper, function(req, res) {
		//joins
		Promise.all([
			db.Package.findAll({
				include: [{
					model: db.User, 
					include: [{
						model: db.UserInfo
					}]
				}]
			}).then(function(dbPackage){
				return dbPackage
			}),
			db.User.findAll({
				include : [{
					model:db.UserInfo
				}]
			}).then(function(dbDropdown){
				console.log(dbDropdown);
				return dbDropdown
			})
		]).then(function(result) {
			res.render("associates-block", 
			{'dbPackage':result[0],
			'dbDropdown':result[1],
			'userName':req.user.name	
			});
		})
	})


//Associate PUT route******************************************************************************************************************************
	app.put('/api/packages/associate/:id',helper, function(req,res){
		console.log("Request is " , req.body);
		console.log("Request picked up date is " , req.body.pickUpDate);

		console.log("Request status is " , req.body.status);
		console.log("Req user is " , req.user.id)

		db.Package.update({
			pickUpDate: req.body.pickUpDate,
			status: req.body.status,
			updater: req.user.name
		},{
			where: {
			id: req.params.id
			}
		}).then(function(updatedPackage){
			res.json(updatedPackage);
		});
	});

//resident get route******************************************************************************************************************************
	app.get("/api/packages/resident",helper, function(req,res){

		Promise.all([
			db.User.find({
				where: {
					id: req.user.id
				},
				include:{
					model: db.Package
				}
			}).then(function(dbPackage){

				let packages = {packages: dbPackage.Packages, name: dbPackage.name};
					return packages;
			}),
			db.User.find({
				where: {
					id: req.user.id
				},
				include: [{
					model: db.UserInfo
				}]
			}).then(function(dbUserDetails){
				return dbUserDetails;
			})
		]).then(function(result){
			res.render('residents-block',{
				'packages': result[0],
				'dbUserDetails': result[1]
				}
			);
		});
	});

//resident put route******************************************************************************************************************************

	app.put('/api/residents/packages/:id',helper, function(req,res){

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
				userid: req.user.id,
				id: req.params.id
			}
		}).then(function(updatedPackage){
			res.json(updatedPackage);
		});
	});


	//nodemailer send mail ******************************************************************************************************************************
	'use strict';

	const nodemailer = require('nodemailer');

	//associate route
	app.get("/api/packages/sendAlert",helper, function(req, res) {
	//joins 


		db.Package.findAll({
			include: [{
				model: db.User, 
				include: [{
					model: db.UserInfo
				}]
			}]
		}).then(function(dbPackage) {
			res.json(dbPackage);
			// console.log(dbPackage[0].dataValues)
			for (let i=0;i<dbPackage.length;i++){
				if(!dbPackage[i].dataValues.status){
					console.log('not send ');
					nodemailer.createTestAccount((err, account) => {
						// create reusable transporter object using the default SMTP transport
						const transporter = nodemailer.createTransport({
							host: 'smtp.ethereal.email',//smtp.gmail.com
							port: 587,
							auth: {
								user: 'qdxv7unktzkgbgzi@ethereal.email',
								pass: 'uDrPajJ9kczW6x7d4z'
							}
						});
						// setup email data with unicode symbols
						let mailOptions = {
							from: '"Package Alert Company" <PAC@UNC.com>', // sender address
							to: dbPackage[i].dataValues.User.dataValues.email, // list of receivers
							subject: 'Package need pick up ✔', // Subject line
							text: 'Hey your package has arrived: '+dbPackage[i].dataValues.packageName, // plain text body
							html: '<b>Hey your package has arrived: '+dbPackage[i].dataValues.packageName+'</b>' // html body
						};

						// send mail with defined transport object
						transporter.sendMail(mailOptions, (error, info) => {
						if (error) {
							return console.log(error);
						}
						console.log('Message sent: %s', info.messageId);
						// Preview only available when sending through an Ethereal account
						console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

						// Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@blurdybloop.com>
						// Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
						});
					});

				}
			}
			// console.log(dbPackage.length)
		})
	});

	// Create Package******************************************************************************************************************************
	app.post("/api/create",helper,function(req,res){
		db.Package.create({
			packageName :req.body.packageName,
			creator:req.user.name,
			UserId :req.body.residentList
		})
		.then(function(result){
			res.redirect('/api/packages/associate')
		})
	})
	//Create User
	app.post('/api/createUser',helper, function(req,res){
    // console.log(req.body)
    db.User.create({
        name: req.body.name,
        email: req.body.email,
        position: req.body.position, 
        uid: req.body.uid,
        pwd: req.body.pwd,
        UserInfo: [{
            number: req.body.number,
            building: req.body.building,
            street: req.body.street
        }]
    },
    {
        include: [
                {
                    model: db.UserInfo
                }
                ]
    }
    
    ).then(function(result){
        // console.log(db.User);
        // res.json(result);
        res.redirect('/api/packages/associate');
    });
});
}
