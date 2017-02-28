var appname = 'app.js ';
var express = require('express')
,	app 	= express(app)
,	server 	= require('http').createServer(app);
var Eureca  = require('eureca.io');

app.use(express.static(__dirname+'/public'));
app.get('/',function(req, res, send){res.sendfile('index.html');});
server.listen(8080,function(){console.log(appname+'listening');});

var connections = {};
var eServer= new Eureca.Server({allow:['tchat.send','tchat.userConnected','tchat.getPos']});
	eServer.attach(server);

var tchatServer = eServer.exports.tchat = {};
var Player = function(id,nick,x,y){
	this.id = id;
	this.nick = nick;
	this.sprite = null;			
}

	// Login after we set up the nick
	tchatServer.login = function(nick)
	{
		if(nick != undefined)
		{
			var id = this.connection.id;
			connections[id].player = new Player(id,nick,0,0);
			return {player:connections[id].player};
		}
	}

	tchatServer.loggedIn = function()
	{
		for(var c in connections)
		{
			if(connections[c].player && connections[c].player.nick)
			{
				connections[c].client.tchat.userConnected();
			}	
		}
	}

	// Send message to all connected users
	tchatServer.send = function(msg){
		for(var c in connections)
		{
			if(connections[c].player && connections[c].player.nick)
				connections[c].client.tchat.send(connections[this.connection.id].player.nick, msg);
		}
	}	

	tchatServer.lookForOthers= function()
	{
		var others = [];
		var id = connections[this.connection.id].player;	
		if(!id) return;

		for(var c in connections)
		{
			if(connections[c].player && connections[c].player.nick)
			{
				if(connections[c].player.nick != id.nick)
				{
					others.push(connections[c].player);
				}
			}	
		}		
		return others;
	}

eServer.onConnect(function(connection){	
	connections[connection.id] = {
		player:null,
		client: eServer.getClient(connection.id)
	};			
	// Nothing here happens other than saving the connection into our array
});

eServer.onDisconnect(function (connection){ 
	delete connections[connection.id];
});
