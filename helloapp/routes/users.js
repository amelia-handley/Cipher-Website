var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var User = require('../models/user');

router.get('/', function(req, res, next) {
	User.find()
	.exec()
	.then(docs => {
		console.log(docs);
		res.status(200).json(docs);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err })
	});
});

router.post('/signup', function(req, res, next) {
		User.find({userName: req.body.userName})
		.exec()
		.then(user => {
			if (user.length <= 1) {
				return res.status(409).json({
					message: 'User Name already exists.'
				});
			}
			bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
				if(err) {
					return res.status(500).json({error : err});
				} else {
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						userName: req.body.userName,
						userEmail: req.body.userEmail,
						userPassword: hash
				});
				user
				.save()
				.then(result => {
					console.log(result);
						res.status(201).json({
							message: 'User has been created'
						})
					})
				.catch(err => {
					console.log(err);
					res.status(500).json({ error: err})
				});
			}
		});
	});
	
});

router.post("/login", function(req, res, next) {
	User.find({userName: req.body.userName})
		.exec()
		.then(user => {
			if(user.length <1) {
				return res.status(401).json({
					message: 'Authorisation failed'
				});
			}
			bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result))
				if(err) {
					return res.status(401).json({
						message: 'Authorisation failed'
					});
				}
				if(result) {
					return res.status(200).json({
						message: 'Authorisation successful'
					});
				}
				res.status(401).json({
					message: 'Authorisation failed'
			});
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error:err}); 
	});

});

router.get('/:userId', function(req, res, next) {
	const id = req.params.userId;
	User.findById(id)
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if(doc) {
				res.status(200).json(doc);
			} else {
				res.status(404).json({message: "Entry not found"})
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error:err}); 
		});
});

router.delete("/:userId", function(req, res, next) {
	User.remove({_id: req.params.userId})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'User Deleted'
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error:err})
		});
	})
});
	
module.exports = router;
