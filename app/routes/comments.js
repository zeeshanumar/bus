var News = require('../models/news');
var Comment = require('../models/comment');
//var express = require('express');
//var router = express.Router();
var ObjectId	= require('mongoose').Types.ObjectId;

/***	Routes for /comments/:news_id	***/
//router.route('/comments/:news_id')

// Create Comment at /api/comments:news_id
exports.postComment = function (req, res) {
	var comment = new Comment({
		news	: req.params.news_id,
		author	: req.user._id,
		content	: req.body.content
	});
	
	comment.save(function (error) {
		if(error)
			res.send(error);
		else
		{
			News.findById(new ObjectId(req.params.news_id), function (error, news) {
				if(error)
					res.send(error);
				news.comments = news.comments + 1;
				news.save(function (error) {
					if(error)
						res.send(error);
				});
			});

			res.json({message: 'Comment Saved!'});
		}
	});
};

	// Get all Comments at /api/comments:news_id
exports.getComments = function (req, res) {
	Comment
		.find({ news : new ObjectId(req.params.news_id) })
		.populate('author', 'username')
		.exec(function (err, comments) {
			if (err) return handleError(err);
			res.json(comments);
		});
};

/***	Routes for /comments/:comment_id	***/
//router.route('/comments/:comment_id')

	// Update the comment with the id comment_id (at /api/comments/:comment_id)
exports.putComment = function (req, res) {
	/*Comment.findById(new ObjectId(req.params.comment_id), function (error, comment) {
		if(error)
			res.send(error);

		comment.content = req.body.content;

		comment.save(function (error) {
			if(error)
				res.send(error);
			else
				res.json({message: 'Comment Updated!'});
		});
	});*/
	Comment.update({ 
		author: req.user._id,
		_id: new ObjectId(req.params.comment_id)
	}, {
		content: req.body.content
	}, function (err, num, raw) {
    	if (err)
	    	res.send(err);

	    res.json({ message: num + ' updated' });
	});
};

	// Delete the comment with the id comment_id (at /api/comments/:comment_id)
exports.deleteComment = function (req, res) {
    Comment.remove({
        author: req.user._id,
        _id: new ObjectId(req.params.comment_id)
    }, function (error, comment) {
        if (error)
            res.send(error);
        else
        {
        	News.findById(new ObjectId(like.news), function (error, news) {
				if(error)
					res.send(error);
				news.comments = news.comments - 1;	//This is not working yet!!!!
				news.save(function (error) {
					if(error)
						res.send(error);
				});
			});
        	res.json({ message: 'Comment deleted!' });
        }
    });
};

//module.exports = router;