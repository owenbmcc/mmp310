/*
	setting sketch
	2.3.2020
*/

var jerry;
var jenny;
var island;
var fish;

function preload() {
	jerry = loadImage('jerry.png');
	jenny = loadImage('jenny.png');
	island = loadImage('island.png');
	fish = loadImage('fish.png');
}

// location variables
var jerryX = 100;
var jerryY = 200;

var jennyX = 300;
var jennyY = 200;

var story = "Once upon a time, there were two characters named Jenny and Jerry.";

// beach, ocean, island
var currentSetting = "beach";

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {

	// conditional statement
	if (currentSetting == "beach") {
		background('lightblue');

		fill('SANDYBROWN');
		noStroke();
		rect(0, height * 2/3, width, height * 1/3);
	} 

	// ocean setting
	else if (currentSetting == "ocean") {
		background('lightblue');

		fill('darkblue');
		noStroke();
		rect(0, height * 2/3, width, height * 1/3);

		// fish
		image(fish, 100, height - 90);
		image(fish, 130, height - 120);
		image(fish, 70, height - 150);

	}

	// island setting 
	else if (currentSetting == "island") {
		background('lightblue');

		fill('darkblue');
		noStroke();
		rect(0, height * 2/3, width, height * 1/3);

		// island
		imageMode(CENTER);
		image(island, width/2, height * 2/3);
	}

	

	// draw characters
	image(jerry, jerryX, jerryY);
	image(jenny, jennyX, jennyY);

	// narration
	fill('black');
	textSize(30);
	textAlign(CENTER, CENTER);
	text(story, width/4, 20, width/2);
}