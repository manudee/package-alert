var db = require('../models');


module.exports = function(app) {

//login route
'use strict';

const nodemailer = require('nodemailer');

	//associate route
	app.get("/api/packages/sendAlert", function(req, res) {
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
			res.json(dbPackage);
			// console.log(dbPackage[0].dataValues)
			for (let i=0;i<dbPackage.length;i++){
				if(!dbPackage[i].dataValues.status){
					console.log('not send ');

					console.log(dbPackage);
					//mail

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
	})


};

