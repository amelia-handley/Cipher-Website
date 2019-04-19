var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var checkAuth = require('../middleware/check-auth');
var Mail = require('../models/mailM');

/* Get Home page */
router.get('/mail', function(req,res,next){
	res.render('mail', {title: 'Mail'});
});

router.get('/send', function(req,res,next){
	res.render('send', {title: 'Send Mail'});
});

router.get('inbox', function(req,res,next){
	res.render('inbox', {title: 'Inbox'});
});


// Handling GET requests to /mail
router.get('/inbox', function(req, res, next) {
	Mail.find(req.params.userName)
	.select('userName recipientName contents _id ')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			Mail: docs.map(doc => {
				return {
					userName: doc.name,
					recipientName: doc.recipientName,
					contents: doc.contents,
					}
				})
		};
		res.render('send/' + user[0]._id);
	})
	.catch(err => {
		console.log(err);
		res.status(500).json({ error: err })
	});
});


// POST request to send messages
router.post('/send', function(req, res, next) {
	var mail = new Mail({
		_id: new mongoose.Types.ObjectId(),
		userName: req.body.userName,
		recipientName: req.body.recipientName,
		contents: req.body.contents
	});
	mail
	.save()
	.then(result => {
		console.log(result)
	})
	.catch(err => console.log(err));
		res.redirect('/mail')
	
});

router.get('/:id', function(req, res, next) {
	Mail.findById(req.params.id, function(err, mail) {
		res.render('mail', {
			mail: mail
		});
	})
});

/*
router.delete('/:mailId', function(req, res, next) {
	const id = req.params.messagesId
	Mail.remove({_id:id})
		.exec()
		.then(result => {
			res.status(200).json({
				message: 'Mail deleted',
				request: {
					type: 'POST',
					url: 'http://localhost:5000/mail'
				}
			})
		})	
	res.status(200).json({
			message: 'mail Deleted',
			mailId: req.params.mailId,
		});
	});
*/

module.exports = router;
