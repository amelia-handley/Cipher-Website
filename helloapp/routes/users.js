var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
//var jwt = require('jsonwebtoken');

// Get User schema from models folder
var User = require('../models/user');

router.get('/', function(req,res,next){
	res.render('index', {title: 'Sign Up/Login In'});
});

router.get('/signup', function (req,res,next) {
	res.render('signup', {title: 'Create Account'});
});

router.get('/login', function (req,res,next) {
	res.render('login', {title: 'Login'});
});

// GET method to get the /users
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

// Post method used to allow users to sign up
router.post('/signup', function(req, res, next) {
		User.find({userName: req.body.userName})
		.exec()
		.then(user => {
			if (user.length >= 1) {
					// User name already exists
					res.redirect('/users/signup');
			}
			bcrypt.hash(req.body.userPassword, 10, (err, hash) => {
				if(err) {
					res.redirect('/users/signup');
				} else {
					// create new user and store the password as a hash
					const user = new User({
						_id: new mongoose.Types.ObjectId(),
						userName: req.body.userName,
						userPassword: hash
				});
				user
				.save()
				// once created, move to the login page
				.then(result => {
					console.log(result);
						res.redirect('/users/login');
				})
				.catch(err => {
					console.log(err);
					res.status(500).json({ error: err})
				});
			}
		});
	});
});

// GET /logout
router.get('/logout', function(req, res, next) {
	if(req.session) {
		req.session.destroy(function(err) {
			if(err) {
				return next (err);
			} else {
				return res.redirect('/');
			}
		});
	}
});

// POST method to get a users Login details
router.post("/login", function(req, res, next) {
	User.find({userName: req.body.userName})
		.exec()
		.then(user => {
			// User doesnt exist, refresh page
			if(user.length < 1) {
				  res.redirect('/users/login')
			}
			bcrypt.compare(req.body.userPassword, user[0].userPassword, (err, result) => {	
				if(err) {
					//If password failed
					res.redirect('/users/login')
				} 
				//if password successful go to the users mail
				if(result) {
					res.redirect('/mail/' + user[0]._id)
				}
			})
		})
		.catch(err => {
		console.log(err);
		res.status(500).json({error:err}); 
	});
});

// GET user information from their ids
router.get('/:userId', function(req, res, next) {
	const id = req.params.userId;
	User.findById(id)
		.exec()
		.then(doc => {
			console.log("From database", doc);
			if(doc) {
				res.redirect('/mail')
			} else {
				res.status(404).json({message: "Entry not found"})
			}
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error:err}); 
		});
});

// delete a user from the database
router.delete("/:userId", function(req, res, next) {
	User.remove({_id: req.params.userId})
		.exec()
		.then(result => {
			res.redirect('/users')
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({error:err})
	});
});

	
module.exports = router;
