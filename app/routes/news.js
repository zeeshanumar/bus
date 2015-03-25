var News = require('../models/news');
var Tag = require('../models/tag');
//var express = require('express');
//var router = express.Router();
var ObjectId	= require('mongoose').Types.ObjectId;

function tagExists(n) {
	console.log('In func: ' + n);
	Tag
		.find({name : n},function (err, tags){
			//console.log('Find ' + n + ' result: ' + tags);
			if(tags.length > 0)
			{
				console.log('Greater');
				return 1;
			}
			else
				return 0;
		});
		//.exec();
};

/***	Routes for /news	***/
//router.route('/news')
	
	// Create News at /api/news
exports.postNews = function (req, res) {
	/*var App = {
		t_count : 0
	};
	var tags = [];
	for(var i=0; i<req.body.tags.length; i++){
		App.t_count = 0;
		Tag.count({ name : req.body.tags[i] }, function (err, count){
			App.t_count = count;
			if(App.t_count > 0)
			{
				console.log('It exists!');
				Tag.findOne({ name : req.body.tags[i] },function (err,tag){
					tags.push(tag._id);
					//console.log('tags: ' + tags);
				});
			} else {
				var t = new Tag({
					name	: req.body.tags[i]
				});
				//console.log('tag id: ' + t._id);
				tags.push(t._id);
				//console.log('tags: ' + tags);	
				t.save(function (error,tag) {
					if(error)
						res.send(error);
				});
				//console.log('tag id: ' + t._id);
			}
		});
		console.log('t_count: ' + App.t_count);
		
		console.log('tags: ' + tags);
		//console.log(tagExists(req.body.tags[i]));
		
	}
	//console.log('After: ' + tags);*/
	var news = new News({
		author		: req.user._id,	//req.user._id;	//session??????
		title		: req.body.title,
		content		: req.body.content,
		tags		: req.body.tags,
		likes		: 0,
		comments 	: 0
	});

	news.save(function (error) {
		if(error)
			res.send(error);
		else
			res.json({message: 'News Posted!'});
	});
};

	// Get all News at /api/news
exports.getNewsFeed = function (req, res) {
	News
		.find()
		.populate('author tags', 'username name')
		.exec(function (err, news) {
			if (err) return handleError(err);
			res.json(news);
		});
};

exports.getNewsByUser = function (req, res) {
	News
		.find({ author : new ObjectId(req.params.user_id)})
		.populate('author tags', 'username name')
		.exec(function (err, news) {
			if (err) return handleError(err);
			res.json(news);
		});
};

/***	Routes for /news/:news_id	***/
//router.route('/news/:news_id')
	
	// Get the news with the id news_id (at /api/news/:news_id)
exports.getNews = function (req, res) {
	News
		.findById(new ObjectId(req.params.news_id))
		.populate('author tags')
		.exec(function (err, news) {
			res.json(news);
		});
};

	// Update the news with the id news_id (at /api/news/:news_id)
exports.putNews = function (req, res) {
	/*News.findById(new ObjectId(req.params.news_id), function (error, news) {
		if(error)
			res.send(error);
		//console.log("Before update");
		
		news.title		= req.body.title;
		news.content	= req.body.content;
		news.tags		= req.body.tags;

		news.save(function (error) {
			//console.log("During save");
			if(error)
				res.send(error);
			else
				res.json({message: 'News Updated!'});
		});
	});*/

	News.update({ 
		author: req.user._id,
		_id: new ObjectId(req.params.news_id)
	}, {
		title: req.body.title,
		content: req.body.content,
		tags: req.body.tags
	}, function (err, num, raw) {
	    if (err)
	      res.send(err);

	    res.json({ message: num + ' updated' });
	});
};

	// Delete the news with the id news_id (at /api/news/:news_id)
exports.deleteNews = function (req, res) {
    News.remove({
    	author: req.user._id,
        _id: new ObjectId(req.params.news_id)
    }, function (error, news) {
        if (error)
            res.send(error);
        else
        	res.json({ message: 'News deleted!' });
    });
};

//module.exports = router;

/*Manual Population*/
/*
/*for (var index = obj.length - 1; index >= 0; index--) {
							
							var j = JSON.stringify(obj[index]);
							var i = JSON.parse(j);

							var author_json = {	//Why is it giving all fields of author?
								_id			: obj[index].author._id,
								name		: obj[index].author.username
							}
							i.author = author_json;

							var tags = '[]';
							var tags_json = JSON.parse(tags);
							for(var n=0; n<obj[index].tags.length; n++){
								tags_json.push({
									_id			: obj[index].tags[n]._id,
									name		: obj[index].tags[n].name,
								});
							}
							i.tags = tags_json;
						}
*/

/* Single
/*if (err) return handleError(err);
				var j = JSON.stringify(news);
				var i = JSON.parse(j);

				var author_json = {
					_id			: news.author._id,
					name		: news.author.username,
					email		: 'yoyo',
					phone		: news.author.phone,
					dob			: news.author.dob,
					profession	: news.author.profession,
					country		: news.author.country
				}
				i.author = author_json;

				var tags = '[]';
				var tags_json = JSON.parse(tags);
				for(var n=0; n<news.tags.length; n++){
					tags_json.push({
						_id			: news.tags[n]._id,
						name		: news.tags[n].name,
					});
				}
				i.tags = tags_json;
*/