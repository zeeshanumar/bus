// app/models/comment.js

var mongoose		= require('mongoose');
var Schema			= mongoose.Schema;

var BusStopSchema	= new Schema({
	_id		: Schema.Types.ObjectId,
	Name	: String,
	Longitude	: String,
	Latitude : String,
	Route	: String,
	Date	: {type: Date , default:Date.now} 
});

module.exports = mongoose.model('BusStop', BusStopSchema);