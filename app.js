let express = require('express');
let app = express();

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Root');
});

app.listen(3000, function() {
    console.log('Server is starting!');
});