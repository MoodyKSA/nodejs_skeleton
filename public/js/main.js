var appname = 'main.js ';
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: eClientCreate, update: update, render: render });

var eClient;
var eServerProxy;
var tchat;

function preload(){}
function eClientCreate()
{
	eClient = new Eureca.Client();
	eClient.ready(function(serverProxy){
		eServerProxy = serverProxy;

		create();
	});		
}
function create(){}
function render(){}
function update(){}

