var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shelfObjects');

var itemSchema = new mongoose.Schema({
	item: String,
});

var itemModel = mongoose.model('itemModel', itemSchema);

module.exports = itemModel;
