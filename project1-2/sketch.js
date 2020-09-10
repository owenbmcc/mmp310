/* 
	project 1
	9/1
*/

/* global variables */
var jerryIdle, jerryWalk;
var jerryX, jerryY;
var jerrySpeed = 3;

var treeImage, cloudImage;

function preload() {
	jerryIdle = loadImage("jerry_idle.gif");
	jerryWalk = loadImage("jerry_walk.gif");
	treeImage = loadImage("tree.png");
	cloudImage = loadImage("cloud.png");
}

function setup() {
	createCanvas(640, 480);
	jerryX = width/2;
	jerryY = height/2;
	imageMode(CENTER);
}

function draw() {
	background(220);

	// setting background

	// loop
	for (var cloudCounter = 0; cloudCounter < 5; cloudCounter += 1) {
		image(cloudImage, cloudCounter * 150, 100);
		image(cloudImage, cloudCounter * 125 + 100, 175);
	}

	for (let x = 0; x < width; x += 100) {
		image(treeImage, x, 300);
		image(treeImage, x + 50, 350);
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

	/* draw character image */
	if (jerryIsWalking) {
		image(jerryWalk, jerryX, jerryY);
	} else {
		image(jerryIdle, jerryX, jerryY);
	}


	// foreground
	for (let x = 0; x < width; x += 50) {
		image(treeImage, x, 400);
	}
	
}