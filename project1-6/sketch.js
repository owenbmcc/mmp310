/*
	
	project 1-6
	objected oriented version
	classes and objects
	
*/

var jerryIdle, jerryWalk, jerryJump;
var treeImage, cloudImage, signImage, snakeImage;

var player;
var scenes = {};
var currentScene = 'map';

function preload() {
	jerryIdle = loadImage("jerry_idle.gif");
	jerryWalk = loadImage("jerry_walk.gif");
	jerryJump = loadImage("jerry_jump.gif");

	treeImage = loadImage("tree.png");
	cloudImage = loadImage("cloud.png");
	signImage = loadImage("sign.png");
	snakeImage = loadImage("snake.gif");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont("Comic Sans MS");
	textAlign(CENTER, CENTER);
	imageMode(CENTER);

	player = new Player(width / 2, height / 2);
	
	scenes.map = new MapScene('map', 220);

	scenes.easy = new PlatformScene('easy', 'lightblue', 3, 6);
	scenes.medium = new PlatformScene('medium', 'purple', 3, 6);
	scenes.hard = new PlatformScene('hard', 'darkblue', 3, 6);

	scenes.win = new Prompt('win', 'You win!', 'Hit Enter to Go to Map', 'map');
	scenes.lose = new Prompt('lose', 'You lose!', 'Hit Enter to Try Again');

}

function draw() {
	scenes[currentScene].draw();
}