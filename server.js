var express = require('express');

var stylesheets = require('./modules/stylesheets.js');
var scripts = require('./modules/scripts.js');

var app = express.createServer();
var port;

// add global stylesheets
stylesheets.add({href: 'stylesheets/main.css'});
stylesheets.add({href: 'stylesheets/board.css'});
stylesheets.add({href: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/smoothness/jquery-ui.css'});

// add global scripts
scripts.add({src: 'http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js'});
scripts.add({src: 'http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js'});
scripts.add({src: 'scripts/board.js'});

app.configure(function(){
    app.set('view engine', 'jade');
    app.set('view options', {
        stylesheets: stylesheets.list(),
        scripts: scripts.list()
    });
    app.use(express['static'](__dirname + '/public'));
});

app.configure('development', function(){
    port = process.env.C9_PORT;
});

app.configure('production', function(){
    port = process.env.PORT;
});

app.get('/', function(req, res){
    res.render('index', {});
});

app.listen(port);