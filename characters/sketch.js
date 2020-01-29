/*
	characters sketch
	1.27.2020
*/

// loading graphics
var jerry;  // var declaration
var jenny;

/* 
	runs before setup
	when preload is done, 
	setup gets called
*/
function preload() {
	jerry = loadImage('jerry.png');
	jenny = loadImage('jenny.png');
}

// location variables
var jerryX = 100;
var jerryY = 200;

var jennyX = 300;
var jennyY = 200;

var story = "Once upon a time, there were two characters named Jenny and Jerry.";


// runs once to set up browser
function setup() {
	createCanvas(windowWidth, windowHeight);
}

// runs 60fps draws graphics
function draw() {
	background('lightblue');

	// draw characters
	image(jerry, jerryX, jerryY);
	image(jenny, jennyX, jennyY);

	// narration
	textSize(30);
	textAlign(CENTER, CENTER);
	text(story, width/4, 20, width/2);
}