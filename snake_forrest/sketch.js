/*
	
	project 1-6
	objected oriented version
	classes and objects
	
*/

var jerryIdle, jerryWalk, jerryJump;
var treeImage, cloudImage, signImage, snakeImage;
var rockImage, bushImage;
var extraLifeImage, pogoStickImage;

var player;
var level = 1;
var score = 0;
var display;
var scenes = {}; // empty object literal
var currentScene = 'beginning';

function preload() {
	jerryIdle = loadImage("images/jerry_idle.gif");
	jerryWalk = loadImage("images/jerry_walk.gif");
	jerryJump = loadImage("images/jerry_jump.gif");

	treeImage = loadImage("images/tree.png");
	cloudImage = loadImage("images/cloud.png");
	signImage = loadImage("images/sign.png");
	snakeImage = loadImage("images/snake.gif");
	rockImage = loadImage("images/rock.png");
	bushImage = loadImage("images/bush.png");

	extraLifeImage = loadImage('images/ExtraLife.gif');
	pogoStickImage = loadImage('images/pogo_stick.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);

	player = new Player(width / 2, height / 2);

	display = new Display();

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
	display.draw();
}