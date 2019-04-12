var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
	res.status(200).json({
		message: 'Handling GET requests to /users'
	});
});

router.post('/', function(req, res, next) {
	const user = {
		userId: req.body.userId,
		userPassword: req.body.userPassword,
	};
	res.status(201).json({
		message: 'Handling POST requests to /users',
		createdUser: user
	});
});

router.get('/:userId', function(req, res, next) {
	const id = req.params.userId
	if(id === 'special') {
		res.status(200).json({
			message: 'You discovered the special ID',
			id: id
		});
	} else {
		res.status(200).json({
			message: 'You passed an ID',
			id: id
		});
	}
});
	
module.exports = router;
