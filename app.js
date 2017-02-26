var appname = 'app.js ';
var express = require('express')
,	app 	= express(app)
,	server 	= require('http').createServer(app);
var Eureca  = require('eureca.io');

app.use(express.static(__dirname+'/public'));
app.get('/',function(req, res, send){res.sendfile('index.html');});
server.listen(8080,function(){console.log(appname+'listening');});

var eServer= new Eureca.Server();
	eServer.attach(server);

eServer.onConnect(function(connection){	});
eServer.onDisconnect(function (connection){ });
