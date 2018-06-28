let express = require('express');
let router = express.Router();
let request = require('request');

router.get('/search', function (req, res) {
  res.render('search');
})

router.get('/results', function (req, response) {
  let search = req.query.search;
  request('http://omdbapi.com/?s=' + search + '&apikey=thewdb', function (err, res, body) {
    if (!err && res.statusCode == 200) {
      response.render('results', { data: JSON.parse(body)['Search'] });
    }
  });
})

module.exports = router;