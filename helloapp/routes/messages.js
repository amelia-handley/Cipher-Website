var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var SendMessage = require('../models/sendMessage');

// Get messages page
router.get('/', function(req, res, next) {
	res.status(200).json({
		message: 'Handling GET requests to /messages'
	});
});
 
router.post('/', function(req, res, next) {
	var messages = new SendMessage({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		senderName: req.body.senderName,
		contents: req.body.contents
	});
	messages
	.save()
	.then(result => {
		console.log(result);
	})
	.catch(err => console.log(err));
	res.status(201).json({
		message: 'Message was Created',
		createdmessages: messages,
	});
});

router.get('/:messagesId', function(req, res, next) {
	const id = req.params.userId
	SendMessage.findbyID(id)
		.exec()
		.then(doc => {
			console.log(doc);
			res.status(200).json(doc);
		})
		.catch(err => console.log(err));
			console.log(err);
			res.status(500).json({error:err});
	});

router.delete('/:messagesId', function(req, res, next) {
	const id = req.params.userId
		res.status(200).json({
			messages: 'Message Deleted',
			messagesId: req.params.messagesId,
		});
	});

module.exports = router;
