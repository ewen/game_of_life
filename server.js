var express = require('express');

var stylesheets = require('./modules/stylesheets.js');
var scripts = require('./modules/scripts.js');

var app = express.createServer();

// add global stylesheets
stylesheets.add({href: 'stylesheets/board.css'});

// add global scripts
scripts.add({src: 'http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js'});
scripts.add({src: 'scripts/board.js'});

app.configure(function(){
    app.set('view engine', 'jade');
    app.set('view options', {
        stylesheets: stylesheets.list(),
        scripts: scripts.list()
    });
    app.use(express['static'](__dirname + '/public'));
});

app.get('/', function(req, res){
    res.render('index', {});
});

app.listen(process.env.C9_PORT);