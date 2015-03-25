// app/models/like.js

var mongoose	= require('mongoose');
var Schema		= mongoose.Schema;

var LikeSchema	= new Schema({
	_id		: Schema.Types.ObjectId,
	route 	:  String,
	news	: { type: Schema.Types.ObjectId, ref: 'News' },
	author	: { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Like', LikeSchema);