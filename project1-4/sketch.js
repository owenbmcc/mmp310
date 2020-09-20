/* 
	project 1-3
	adding arrays to setting positions
*/

/* global variables */
var jerryIdle, jerryWalk;
var jerryX, jerryY;
var jerrySpeed = 3;

var treeImage, cloudImage;

var bgTreeX = [50, 100, 200, 350, 423, 507, 571];
var bgTreeY = [300, 250, 350, 250, 333, 356, 267];

var cloudPositions = [
	[100, 100],
	[200, 150],
	[351, 44],
	[552, 103],
	[446, 182]
];

// interactives ... 

function preload() {
	jerryIdle = loadImage("jerry_idle.gif");
	jerryWalk = loadImage("jerry_walk.gif");
	treeImage = loadImage("tree.png");
	cloudImage = loadImage("cloud.png");
}

function setup() {
	createCanvas(640, 480);
	jerryX = width/2;
	jerryY = height/2 + 100;
	imageMode(CENTER);
	rectMode(CENTER);
}

function draw() {
	background(220);
	// console.log(mouseX, mouseY);

	// setting background

	// loop
	for (let i = 0; i < bgTreeX.length; i++) {
		image(treeImage, bgTreeX[i], bgTreeY[i]);
	}

	for (let i = 0; i < cloudPositions.length; i++) {
		image(cloudImage, cloudPositions[i][0], cloudPositions[i][1]);

		// animate the clouds
		cloudPositions[i][0] += 2; // increase x
		if (cloudPositions[i][0] > width + cloudImage.width / 2) {
			cloudPositions[i][0] = -cloudImage.width / 2;
		}

		cloudPositions[i][1] += random(-1, 1); // random y
	}


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

	scroll(100, 100, "hello");
	scroll(400, 100, "find the blah blah");

	/* draw character image */
	if (jerryIsWalking) {
		image(jerryWalk, jerryX, jerryY);
	} else {
		image(jerryIdle, jerryX, jerryY);
	}


	// foreground
	for (let x = 0; x < width + 100; x += 150) {
		image(treeImage, x, 400);
	}


	
	
}

function scroll(x, y, msg) {
	// draw scroll
	let w = 50;
	let h = 100;
	noStroke();
	fill(255);
	rect(x, y, w, h);

	// is player in the scroll?
	if (x - w / 2 < jerryX + jerryIdle.width / 2 &&
		x + w / 2 > jerryX - jerryIdle.width / 2 &&
		y - h / 2 < jerryY + jerryIdle.height / 2 &&
		y + h / 2 > jerryY - jerryIdle.height / 2) {

		textSize(10);
		fill(0);
		text(msg, x + 10, y + 10, w - 20, h - 20);
	}
	
}