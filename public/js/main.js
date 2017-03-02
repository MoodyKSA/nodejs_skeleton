var appname = 'main.js ';
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 
	'phaser-example', { preload: preload, create: create, update: update, render: render });

var eClient;
var eServerProxy;

function preload(){}
function create(){
	$(document).ready(function(){
		console.log(appname +'JQuery ready');
	});

	eClient = new Eureca.Client();
	eClient.ready(function(serverProxy){
		console.log(appname +'Eureca client ready');		
		eServerProxy 	= serverProxy;	
     }); 
}
function update(){}
function render(){}
