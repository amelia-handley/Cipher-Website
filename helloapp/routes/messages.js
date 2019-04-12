var express = require('express');
var fs = require("fs");
var router = express.Router();
var mongoose = require('mongoose');

const SendMessage = require('../models/sendMessage')

// Get messages page
router.get('/', function(req, res, next) {
	res.status(200).json({
		message: 'Handling GET requests to /messages'
	});
});
 
router.post('/', function(req, res, next) {
	const sendMessage = new SentMessage({
		_id: new mongoose.Types.ObjectId(),
		name: req.body.name,
		senderName: req.body.senderName,
		contents: req.body.contents,
	});
	messages.save( ).then(result => {
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
		res.status(200).json({
			message: 'Message Details' ,
			messageId: req.params.messagesId,
		});
	});

router.delete('/:messagesId', function(req, res, next) {
	const id = req.params.userId
		res.status(200).json({
			messages: 'Message Deleted',
			messagesId: req.params.messagesId,
		});
	});

module.exports = router;
