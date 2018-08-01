const express = require('express');
const app = express();

app.set('view engine', 'ejs');

const birds = require('./birdsRouter');
const omdb = require('./omdbRouter');
const yelpCamp = require('./yelpCampRouter');
const blog = require('./blogRouter');

app.use('/static', express.static('public'));

app.use(requestTime);
app.use('/birds', birds);
app.use('/omdb', omdb);
app.use('/yelp', yelpCamp);
app.use('/blog', blog);

app.get('/', function (req, res) {
	let resText = req.requestTime + ' Root';
	res.send(resText);
});

app.get('/user/:id', [isValiseID, showID]);

app.get('/*', function (req, res) {
	throw new Error('Cannot reach ' + req.path)
})

app.listen(3000, function () {
	console.log('Server is starting!');
});

function requestTime(req, res, next) {
	req.requestTime = new Date();
	next();
}

function isValiseID(req, res, next) {
	if (req.params.id == 0) {
		next('route');
	}
	else {
		next();
	}
}

app.use(errorLog);
app.use(errorHandler);


function showID(req, res, next) {
	let resText = 'User ID: ' + req.params.id;
	res.send(resText);
};

function errorLog(err, req, res, next) {
	console.log(err.message);
	next(err);
}

function errorHandler(err, req, res, next) {
	res.render('error', { msg: err.message });
}

