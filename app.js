var appname = 'app.js ';
var express = require('express')
,	app 	= express(app)
,	server 	= require('http').createServer(app);
var Eureca  = require('eureca.io');

app.use(express.static(__dirname+'/public'));
app.get('/',function(req, res, send){res.sendfile('index.html');});
server.listen(8080,function(){console.log(appname+'listening on *:8080');});

var connections = {};
var eServer= new Eureca.Server({allow:['']});
	eServer.attach(server); 
	
eServer.onConnect(function(connection){	
	connections[connection.id] = {
		client: eServer.getClient(connection.id)};			
});

eServer.onDisconnect(function (connection){ 
	delete connections[connection.id];
});
