/* 
	project 1-5
	scene management + game scene
*/

/* global variables */
var jerryIdle, jerryWalk;
var jerryX, jerryY;
var jerryMainX, jerryMainY;
var jerrySpeed = 3;

var groundY = 200;

var treeImage, cloudImage, signImage;

var bgTreeX = [50, 100, 200, 350, 423, 507, 571, 800, 900, 1200];
var bgTreeY = [300, 250, 350, 250, 333, 356, 267, 350, 300, 400];

var cloudPositions = [
	[100, 100],
	[300, 150],
	[551, 44],
	[752, 103],
	[946, 182]
];

var scene = "main"; // game, win, lose

function preload() {
	jerryIdle = loadImage("jerry_idle.gif");
	jerryWalk = loadImage("jerry_walk.gif");
	treeImage = loadImage("tree.png");
	cloudImage = loadImage("cloud.png");
	signImage = loadImage("sign.png");
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
	sign("Snake World!", 500, height / 2);

	sign("Begin the search for the magic wand.", 100, height / 2);
	sign("The magic wand is to the west.", 1000, height / 2 + 100);

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

function setupGame() {

	jerryMainX = jerryX;
	jerryMainY = jerryY;

	jerryX = 200;
	jerryY = height - groundY;

	scene = 'game';
}

function game() {
	background('lightblue');
	noStroke();
	fill('lightgreen');
	rect(0, height - groundY, width, groundY);

	clouds();

	image(jerryWalk, jerryX, jerryY);
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
		setupGame();
	}
}

// game object functions 

function sign(msg, x, y) {
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
			setupGame();
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