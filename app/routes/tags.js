var Tag = require('../models/tag');
//var express = require('express');
//var router = express.Router();
var ObjectId	= require('mongoose').Types.ObjectId;

/***	Routes for /tags	***/
//router.route('/tags')

	// Create Tag at /api/tags
exports.postTag = function (req, res) {
	var tag = new Tag({
		name	: req.body.name
	});
			
	tag.save(function (error) {
		if(error)
			res.send(error);
		else
			res.json({message: 'Tag Created!'});
	});
};

	// Get all Tags at /api/tags
exports.getTags = function (req, res) {
	Tag.find(function (error, tags) {
		if(error)
			res.send(error);
		else
			res.json(tags);
	});
};

/***	Routes for /tags/:tag_id	***/
//router.route('/tags/:tag_id')

// Get the tag with the id tag_id (at /api/tags/:tag_id)
exports.getTag = function (req, res) {
	Tag.findById(new ObjectId(req.params.tag_id), function (error, tag) {
		if(error)
			res.send(error);
		else
			res.json(tag);
	});
};

	// Delete the tag with the id tag_id (at /api/tags/:tag_id)
exports.deleteTag = function (req, res) {
    Tag.remove({
        _id: new ObjectId(req.params.tag_id)
    }, function (error, tag) {
        if (error)
            res.send(error);
        else
        	res.json({ message: 'Tag deleted!' });
    });
};

//module.exports = router;