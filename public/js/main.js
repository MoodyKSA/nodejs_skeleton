var appname = 'main.js ';
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 
	'phaser-example', { preload: preload, create: create, update: update, render: render });

var eClient;
var eServerProxy;
var gArcade;
var tchat; 

var filter,sprite;

function preload()
{
	game.load.image('star', './assets/jets.png');
}

function create()
{
	eClient = new Eureca.Client();
	eClient.ready(function(serverProxy){
		console.log(appname +' client side connection');		
		gArcade 		= game.physics.arcade;
		eServerProxy 	= serverProxy;
		tchat			= eClient.exports.tchat = {}; // Namespace

	//  From http://glslsandbox.com/e#18918.0
    // Tenjix",

    var fragmentSrc = [

        "precision mediump float;",

        "uniform float     time;",
        "uniform vec2     resolution;",

        "#define PI 3.1415926535897932384626433832795",

        "const float position = 0.0;",
        "const float scale = 1.0;",
        "const float intensity = 1.0;",

        // "varying vec2 surfacePosition;",
        // "vec2 pos;",

        "float band(vec2 pos, float amplitude, float frequency) {",
            "float wave = scale * amplitude * sin(1.0 * PI * frequency * pos.x + time) / 2.05;",
            "float light = clamp(amplitude * frequency * 0.02, 0.001 + 0.001 / scale, 5.0) * scale / abs(wave - pos.y);",
            "return light;",
        "}",

        "void main() {",

            "vec3 color = vec3(0.5, 1.5, 10.0);",
            "color = color == vec3(0.0)? vec3(0.5, 10.5, 1.0) : color;",
            "vec2 pos = (gl_FragCoord.xy / resolution.xy);",
            "pos.y += - 0.5;",
            "float spectrum = 0.0;",
            "const float lim = 28.0;",
            "#define time time*0.037 + pos.x*10.",
            "for(float i = 0.0; i < lim; i++){",
                "spectrum += band(pos, 1.0*sin(time*0.1/PI), 1.0*sin(time*i/lim))/pow(lim, 0.25);",
            "}",

            "spectrum += band(pos, cos(10.7), 2.5);",
            "spectrum += band(pos, 0.4, sin(2.0));",
            "spectrum += band(pos, 0.05, 4.5);",
            "spectrum += band(pos, 0.1, 7.0);",
            "spectrum += band(pos, 0.1, 1.0);",

            "gl_FragColor = vec4(color * spectrum, spectrum);",

        "}"

    ];

    filter = new Phaser.Filter(game, null, fragmentSrc);
    filter.setResolution(window.innerWidth, window.innerHeight);

    sprite = game.add.sprite();
    sprite.width = window.innerWidth;
    sprite.height = window.innerHeight;

    sprite.filters = [ filter ];
 	}); 
}

function update(){	
	if(!filter)return;
	filter.update();
}

function render(){}
