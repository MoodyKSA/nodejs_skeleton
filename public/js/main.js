var appname = 'main.js ';
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 
	'phaser-example', { preload: preload, create: create, update: update, render: render });

var eClient;
var eServerProxy;
var sprite;
var gArcade;
var otherPlayers = [];
var otherSprites = [];
var player = null;
var tchat; // Namespace 

function preload()
{
	game.load.image('block', './assets/block.png');
}

function create()
{
	eClient = new Eureca.Client();
	eClient.ready(function(serverProxy){
		console.log(appname +' client side connection');		
	
		game.physics.startSystem(Phaser.Physics.ARCADE);

		gArcade 		= game.physics.arcade;
		eServerProxy 	= serverProxy;
		tchat			= eClient.exports.tchat = {}; // Namespace

		// First thing the user sees, DOM stuff
		$('#nick').val('anon-'+new Date().getTime().toString(32)); 

		// we can use chat now
 		$('#sendBtn').click(function() {
  			if (!eServerProxy) return; 
  			if (!player) return; 
 			eServerProxy.tchat.send($('#msg').val());
			$('#msg').val('');
 		});

 		$('#logBtn').click(function() {

  			if (!eServerProxy) return;   

			// Login button clicked, lets handle it
  			eServerProxy.tchat.login($('#nick').val()).onReady(function(result){

				// Show chat menu
				$('#auth').fadeOut('fast', function() {
					$('#main').fadeIn('fast');	
				});

				// Player object created, lets give it sprite
				player = result.player;
				player.sprite = game.add.sprite(200,game.world.centerY+100,'block');
				player.sprite.anchor.set(0.5);
				game.physics.arcade.enable(player.sprite);
				$(document).prop('title', player.nick);	
				
				// This player is all set.
				eServerProxy.tchat.loggedIn().onReady(function(){
					console.log('We are all set');
				});
			});
 		}); 
	
		tchat.send = function(nick, message){
	  		var tchatline = $('<li><b>'+nick+' </b><span>'+message+'</span></li>');
		  	$('#msgbox').append(tchatline);
		}

		tchat.getPos = function()
		{
			return {id:player.id, x:player.sprite.position.x, y:player.sprite.position.y};
		}

		tchat.userConnected = function()
		{
			console.log(player.nick + ' is searching for others...');
			eServerProxy.tchat.lookForOthers().onReady(function(others){
					otherPlayers = others;
					console.log('Hey! A new user is logged! '+otherPlayers.length + ' found so far');
					
				for(var i =0; i < otherPlayers.length; i++)
				{
					var enemy = otherPlayers[i];
					if(!enemy) return;
					enemy.sprite = game.add.sprite(200,game.world.centerY+100,'block');
					enemy.sprite.anchor.set(0.5);
					game.physics.arcade.enable(enemy.sprite);

					otherSprites.push(enemy);
				}
			});
		}	
	});	
}

// when we get more players, the ID will be diferent in arrays so it would act funny 
// when looping through them
function update()
{
	if(player && player.sprite){
		gArcade.moveToPointer(player.sprite,300);	
		//console.log(player.sprite.position.x);
	}

	for(var i =0; i < otherPlayers.length; i++)
	{
		var enemy = otherPlayers[i];
		if(!enemy) return;
		
		// go to server and get the new updated coords
		// return id,x,y
	}
}

function render(){}
