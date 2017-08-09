var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'test', null, true, false);
var BasicGame = function(game) {}; // DIS IS A FUNCTION
BasicGame.Boot = function(game) {};

var isoGroup, sorted;
BasicGame.Boot.prototype =
{
	preload: function(){
		game.load.image('cube', '../assets/cube.png');	

		game.time.advancedTiming = true;
		game.plugins.add(new Phaser.Plugin.Isometric(game));

		game.iso.anchor.setTo(0.5, 0.5);

	},
	create: function(){
		isoGroup = game.add.group();

		var degree = (Math.PI*2)/(32);
		var cube;
		for(var xx=0; xx < 32; xx++)
		{
			cube = game.add.isoSprite(	Math.sin(xx*degree)*240,
										Math.cos(xx*degree)*240,0,'cube', 0, isoGroup);
			cube.anchor.set(0.5,0.2) // ?
			cube.oldZ = cube.z;
			game.add.tween(cube).to(
				{isoZ: 10}, 1000*((xx)%10), Phaser.Easing.Quadratic.InOut, true, 0, Infinity, true);
		}

		sorted = false;
		game.input.onDown.add(function(){
			sorted = !sorted;
			if(sorted)
				game.iso.simpleSort(isoGroup);
			else
				isoGroup.sort('oldZ');

		}, this);
	},
	update: function(){

	},
	render: function(){
		game.debug.text("I Moayad, the great me, has created this!", 2, 36, "#000000");
	}
};

game.state.add('Boot', BasicGame.Boot);
game.state.start('Boot');
