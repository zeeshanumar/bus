// app/models/comment.js

var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var CommentSchema	= new Schema({
	_id		: Schema.Types.ObjectId,
	news	: { type: Schema.Types.ObjectId, ref: 'News' },
	author	: { type: Schema.Types.ObjectId, ref: 'User' },
	posted	: { type: Date, default: Date.now },
	content	: String
});

module.exports = mongoose.model('Comment', CommentSchema);