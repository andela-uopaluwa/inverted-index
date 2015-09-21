var express = require('express');
var app = express();
var path = require('path');
app.use(express.static(__dirname + '/jasmine'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/jasmine/index.html'));
});

app.get('/test', function(req, res) {
    res.sendFile(path.join(__dirname + '/jasmine/SpecRunner.html'));
});

app.listen(8080);