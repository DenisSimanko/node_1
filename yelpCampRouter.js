const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Campground = require('./models/campground');
const Comment = require('./models/comment');
const User = require('./models/user');

mongoose.connect('mongodb://localhost', {dbName: 'blog'});

router.use(bodyParser.urlencoded({ extended: true }));


router.get('/', function (req, res) {
  res.render('landing');
});

router.route('/campgrounds')
  .get(function (req, res) {
    Campground.find({}, function(err, campgrounds) {
      if (err) {
        console.log(err);
        return;
      }
      res.render('index', { campgrounds });
    });
  })
  .post(function (req, res) {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    Campground.create({ name, image, description })
      .then(function() {
        res.redirect('campgrounds');
      })
      .catch(function(err) {
        res.send(err);
      });
  });

router.get('/campgrounds/new', function (req, res) {
  res.render('new');
});

router.get('/campgrounds/:id', function(req, res) {
  Campground.find({_id: req.params.id}, function(err, camp) {
    if (err) {
      res.send(err);
    }
   res.render('show', { campground: camp[0] });
  });
});

module.exports = router;

//https://www.campleaders.com/system/photos/26723/custom/head-typescamps.jpg