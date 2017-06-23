var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shelfObjects');

var itemSchema = new mongoose.Schema({
	item: String,
	url: String
});

var itemModel = mongoose.model('itemModel', itemSchema);

router.post('/', function(req, res) {
	console.log('hit me', req.body);
	var newItem = {
		item: req.body.item,
		url: req.body.url
	}
	itemModel(newItem).save().then(function() {
		// console.log(response);
		res.send('success')
	})
});

router.get('/', function(req, res) {
	console.log('get req:', req);
	itemModel.find().then(function(response) {
		res.send(response);
	});
});

router.delete('/:id', function(req, res) {
	var id = req.params.id;
	itemModel.remove({
		_id: id
	}).then(function() {
		res.send(200);
	});
}); //end router delete


module.exports = router;
