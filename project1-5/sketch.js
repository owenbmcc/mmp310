/* 
	project 1-5
	scene management + game scene
*/

/* global variables */
var jerryIdle, jerryWalk, jerryJump;
var jerryX, jerryY;
var jerryMainX, jerryMainY;
var jerrySpeed = 3;

// game physics
var groundY = 200;
var GRAVITY = 2; // acceleration 2 pix per frame
var jerryYSpeed = 2;
var jerryIsJumping = false;

var treeImage, cloudImage, signImage, snakeImage;

var bgTreeX = [50, 100, 200, 350, 423, 507, 571, 800, 900, 1200];
var bgTreeY = [300, 250, 350, 250, 333, 356, 267, 350, 300, 400];

var cloudPositions = [
	[100, 100],
	[300, 150],
	[551, 44],
	[752, 103],
	[946, 182]
];

var snakePositions = []; // add snake x values here

var scene = "main"; // game, win, lose
var bgColor = 'lightblue';
var minSnakes = 3;
var maxSnakes = 6;

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
	jerryX = width/2;
	jerryY = height/2 + 100;
	imageMode(CENTER);
}

function draw() {
	// scene manager
	if (scene == 'main') {
		main();
	}
	else if (scene == 'game') {
		game();
	}
	else if (scene == 'win') {
		win();
	}
	else if (scene == 'lose') {
		lose();
	}
}


// scene functions

function setupMain() {
	jerryX = jerryMainX;
	jerryY = jerryMainY;
	scene = 'main';
}

function main() {
	background(220);
	// console.log(mouseX, mouseY);

	// setting background

	// loop
	for (let i = 0; i < bgTreeX.length; i++) {
		image(treeImage, bgTreeX[i], bgTreeY[i]);
	}
	clouds();


	/* logic + events */
	/* character movement */

	var jerryIsWalking = false;

	if (keyIsDown(RIGHT_ARROW)) {
		jerryX += jerrySpeed;
		jerryIsWalking = true;
	}

	if (keyIsDown(LEFT_ARROW)) {
		jerryX -= jerrySpeed;
		jerryIsWalking = true;
	}

	if (keyIsDown(UP_ARROW)) {
		jerryY -= jerrySpeed;
		jerryIsWalking = true;
	}

	if (keyIsDown(DOWN_ARROW)) {
		jerryY += jerrySpeed;
		jerryIsWalking = true;
	}

	/* signs */
	sign("Easy Snake World!", 500, height / 2, 'lightblue', 3, 6);
	sign("Medium Snake World!", 100, height / 2, 'purple', 7, 10);
	sign("Hard Snake World!", 1000, height / 2 + 100, 'darkblue', 11, 15);

	/* draw character image */
	if (jerryIsWalking) {
		image(jerryWalk, jerryX, jerryY);
	} else {
		image(jerryIdle, jerryX, jerryY);
	}


	// foreground
	for (let x = 0; x < width + 100; x += 150) {
		image(treeImage, x, height - 100);
	}
}

function setupGame(fromMain, bg, min, max) {

	bgColor = bg;
	minSnakes = min;
	maxSnakes = max;

	// save jerry's map position
	if (fromMain) {
		jerryMainX = jerryX;
		jerryMainY = jerryY;
	}

	// move jerry to game ground
	jerryX = 200;
	jerryY = height - groundY;

	// add snakes
	snakePositions = []; // reset all snake positions
	var snakeNumber = random(minSnakes, maxSnakes);
	for (let i = 0; i < snakeNumber; i++) {
		// add an x positoin for a new snake half a canvas away from one another + random value
		snakePositions.push( random(width/2, width) + i * width / 2 );
	}

	scene = 'game';
}

function game() {
	background(bgColor);
	noStroke();
	fill('lightgreen');
	rect(0, height - groundY, width, groundY);

	clouds();

	/* jumping and falling */
	// apply gravity
	if (jerryY < height - groundY) {
		jerryYSpeed += GRAVITY;
	} else {
		// jerry on the ground
		jerryYSpeed = 0;
		jerryIsJumping = false;
	}

	// 32 is space
	if (!jerryIsJumping && keyIsDown(32)) {
		jerryYSpeed = -30;
		jerryIsJumping = true;
	}

	jerryY += jerryYSpeed;

	if (jerryIsJumping) {
		image(jerryJump, jerryX, jerryY);
	} else {
		image(jerryWalk, jerryX, jerryY);
	}

	for (let i = 0; i < snakePositions.length; i++) {
		let x = snakePositions[i];
		snake(x); // draw snake and detect player collision
		snakePositions[i] -= 10;

		// if jerry gets past last snake
		if (i == snakePositions.length - 1 && jerryX > x) {
			scene = 'win';
		}
	}
}

function win() {
	textSize(100);
	fill('white');
	text('You win!', width / 2, height / 2);

	textSize(50);
	text('Hit M to Return to Map', width / 2, height / 2 + 100);

	// m key
	if (keyIsDown(77)) {
		setupMain();
	}
}

function lose() {
	textSize(100);
	fill('white');
	text('You lost!', width / 2, height / 2);

	textSize(50);
	text('Hit R to Try Again', width / 2, height / 2 + 100);

	// r key
	if (keyIsDown(82)) {
		setupGame(false, bgColor, minSnakes, maxSnakes);
	}
}

// game object functions 

function sign(msg, x, y, bg, min, max) {
	image(signImage, x, y);

	// 2d collision between player (jerry) and sign 
	
	if (jerryX - jerryIdle.width / 2 < x + signImage.width / 2 &&
		jerryX + jerryIdle.width / 2 > x - signImage.width / 2 &&
		jerryY - jerryIdle.height / 2 < y + signImage.height / 2 &&
		jerryY + jerryIdle.height / 2 > y - signImage.height / 2) {

		fill(255);
		textFont("Comic Sans MS");
		textSize(20);
		textAlign(CENTER, CENTER);
		text(msg, x - signImage.width/2 + 20, y - signImage.height/2, signImage.width - 40, signImage.height - 60);

		textSize(16);
		text("Hit Enter to Play", x, y + 20);

		// enter event
		if (keyIsDown(ENTER)) {
			setupGame(true, bg, min, max);
		}
	}
}

function clouds() {
	for (let i = 0; i < cloudPositions.length; i++) {
		image(cloudImage, cloudPositions[i][0], cloudPositions[i][1]);

		// animate the clouds
		cloudPositions[i][0] += 2; // increase x
		if (cloudPositions[i][0] > width + cloudImage.width / 2) {
			cloudPositions[i][0] = -cloudImage.width / 2;
		}

		cloudPositions[i][1] += random(-1, 1); // random y
	}
}

function snake(x) {
	let y = height - groundY;
	image(snakeImage, x, y);

	// collision
	if (jerryX - jerryIdle.width / 2 < x + snakeImage.width / 4 &&
		jerryX + jerryIdle.width / 2 > x - snakeImage.width / 4 &&
		jerryY - jerryIdle.height / 2 < y + snakeImage.height / 4 &&
		jerryY + jerryIdle.height / 2 > y - snakeImage.height / 4) {

		// change the scene
		scene = 'lose';

	}
}