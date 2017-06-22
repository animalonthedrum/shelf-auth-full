var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shelfObjects');

var itemSchema = new mongoose.Schema({
	item: String,
});

var itemModel = mongoose.model('itemModel', itemSchema);

router.post('/', function(req, res) {
	console.log('hit me', req.body);
	var newItem = {
		item: req.body.item
	}
	itemModel(newItem).save().then(function(err, res) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log(res);
			res.send('success')
		}
	}).catch(function(err) {
		if (err) {
			console.log(err);
			res.send(500);
		}
	});

});


module.exports = router;
