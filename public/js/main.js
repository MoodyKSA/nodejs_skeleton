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
		tchat = eClient.exports.tchat = {};

		var t = document.createTextNode("This is a paragraph.");
		var para = document.createElement("P").appendChild(t);		
		document.getElementById("container").appendChild(para);

		create();
	});		
}
function create(){}
function render(){}
function update(){}

// http://stackoverflow.com/questions/10385950/how-to-get-a-div-to-randomly-move-around-a-page-using-jquery-or-css
