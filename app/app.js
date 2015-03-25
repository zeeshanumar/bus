// app.js

// BASE SETUP
// =============================================================================

// Call the required packages
var express		= require('express');        // call express
var mongoose	= require('mongoose');
var bodyParser	= require('body-parser');
var passport 	= require('passport');

var bus 		= require('./routes/BusStop');

//var news		= require('./routes/news');
//var users		= require('./routes/users');
//var comments	= require('./routes/comments');
//var likes		= require('./routes/likes');
//var tags		= require('./routes/tags');

var app 		= express();                 // define our app using express

//mongoose.connect('mongodb://jawad:6923@ds037601.mongolab.com:37601/newsapp');	// Connect to database
mongoose.connect('mongodb://shani:shani@ds055680.mongolab.com:55680/bus4me');	// Connect to database

//var News = require('./app/models/news');

// Configure app to use bodyParser()
// This will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Use the passport package in our application
app.use(passport.initialize());

// ROUTES SETUP
// =============================================================================

var router = express.Router();              // get an instance of the express Router

// Middleware for all the requests
router.use(function(req, res, next){
	// Generate log
	console.log('New request recieved...');
	next();	// go to next route
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});
// more routes for our API will happen here
/*
//router.route('/users')
	.post(users.postUser)
	.get(auth.isAuthenticated, users.getUsers);

//router.route('/users/:user_id')
	.get(auth.isAuthenticated, users.getUser)
	.put(auth.isAuthenticated, users.putUser)
	.delete(users.deleteUser);

//router.route('/news')
	.post(auth.isAuthenticated, news.postNews)
	.get(auth.isAuthenticated, news.getNewsFeed);

//router.route('/news/:news_id')
	.get(auth.isAuthenticated, news.getNews)
	.put(auth.isAuthenticated, news.putNews)
	.delete(auth.isAuthenticated, news.deleteNews);

router.route('/tags')
	.post(auth.isAuthenticated, tags.postTag)
	.get(auth.isAuthenticated, tags.getTags);

router.route('/tags/:tag_id')
	.get(auth.isAuthenticated, tags.getTag)
	.delete(auth.isAuthenticated, tags.deleteTag);

router.route('/comments/:news_id')
	.post(auth.isAuthenticated, comments.postComment)
	.get(auth.isAuthenticated, comments.getComments);

router.route('/comments/:comment_id')
	.put(auth.isAuthenticated, comments.putComment)
	.delete(auth.isAuthenticated, comments.deleteComment);

router.route('/likes/:news_id')
	.post(auth.isAuthenticated, likes.postLike)
	.get(auth.isAuthenticated, likes.getLikes)
	.delete(auth.isAuthenticated, likes.deleteLike);

router.route('/isLiked/:news_id')
	.get(auth.isAuthenticated, likes.isLiked);
*/
//router.route('/verifyUser')
//	.get(auth.isAuthenticated, users.verifyUser);
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
router.route('/stops')
	.post(bus.postStop)
	.get(bus.getStops);
app.use('/api', router);
/*app.use('/api', news);
app.use('/api', users);
app.use('/api', likes);
app.use('/api', comments);
app.use('/api', tags);
*/
module.exports = app;