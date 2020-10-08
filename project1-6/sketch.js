/*
	
	project 1-6
	objected oriented version
	classes and objects
	
*/

var jerryIdle, jerryWalk, jerryJump;
var treeImage, cloudImage, signImage, snakeImage;
var rockImage, bushImage;

var player;
var scenes = {}; // empty object literal
var currentScene = 'beginning';

function preload() {
	jerryIdle = loadImage("jerry_idle.gif");
	jerryWalk = loadImage("jerry_walk.gif");
	jerryJump = loadImage("jerry_jump.gif");

	treeImage = loadImage("tree.png");
	cloudImage = loadImage("cloud.png");
	signImage = loadImage("sign.png");
	snakeImage = loadImage("snake.gif");
	rockImage = loadImage("rock.png");
	bushImage = loadImage("bush.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	textFont("Comic Sans MS");
	textAlign(CENTER, CENTER);
	imageMode(CENTER);

	player = new Player(width / 2, height / 2);

	scenes.beginning = new Beginning();
	scenes.middle = new Middle();
	scenes.end = new End();

	scenes.easy = new PlatformScene('lightblue', 4, 7);
	scenes.medium = new PlatformScene('darkblue', 8, 10);
	scenes.hard = new PlatformScene('purple', 11, 15);

	scenes.win = new Prompt('You win!', 'Hit Enter to Return to Map');
	scenes.lose = new Prompt('You lose!', 'Hit Enter to Try Again');

}

function changeScene(sceneName, nextScene) {
	currentScene = sceneName;
	scenes[currentScene].setup(nextScene);
}

function draw() {
	scenes[currentScene].draw();
}