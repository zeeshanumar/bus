var News = require('../models/news');
var Like = require('../models/like');
//var express = require('express');
//var router = express.Router();
var ObjectId	= require('mongoose').Types.ObjectId;

/***	Routes for /likes/:news_id	***/
//router.route('/likes/:news_id')

// Create Like at /api/likes:news_id
exports.postLike = function (req, res) {
	var like = new Like({
		author	: req.user._id,
		news	: req.params.news_id
	});

	like.save(function (error) {
		if(error)
			res.send(error);
		else
		{
			News.findById(new ObjectId(req.params.news_id), function (error, news) {
				if(error)
					res.send(error);
				news.likes = news.likes + 1;
				news.save(function (error) {
					if(error)
						res.send(error);
				});
			});
			res.json({message: 'Like Saved!'});
		}
	});
};

	// Get all Likes at /api/like:news_id
exports.getLikes = function (req, res) {
	Like
		.find({ news : new ObjectId(req.params.news_id) })
		.populate('news author', 'title username')
		.exec(function (err, likes) {
			if (err) return handleError(err);
			res.json(likes);
		});
};

exports.isLiked = function (req, res) {
	Like
		.find({ news : new ObjectId(req.params.news_id), author : req.user._id })
		.exec(function (err, likes) {
			if (err) return handleError(err);
			if (likes.length > 0)
				var liked = true;
			else
				var liked = false;
			res.json(JSON.stringify(liked));
		});
};

	// Delete the like with the id news_id (at /api/likes/:news_id)
exports.deleteLike = function (req, res) {
    Like.remove({
    	author: req.user._id,
        news: new ObjectId(req.params.news_id)
    }, function (error, like) {
        if (error)
            res.send(error);
        else
        {
        	News.findById(new ObjectId(like.news), function (error, news) {
				if(error)
					res.send(error);
				news.likes = news.likes - 1;	//This is not working yet!!!!
				news.save(function (error) {
					if(error)
						res.send(error);
				});
			});
        	res.json({ message: 'Like deleted!' });
        }
    });
};

//module.exports = router;