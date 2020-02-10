/*
	final story sketch
	2.10.2020
*/

var jerry;
var jenny;
var islandImage;
var fish;

function preload() {
	jerry = loadImage('jerry.png');
	jenny = loadImage('jenny.png');
	islandImage = loadImage('island.png');
	fish = loadImage('fish.png');
}

// location variables
var jerryX = 100;
var jerryY = 200;

var jennyX = 300;
var jennyY = 200;

var story = "Once upon a time, there were two characters named Jenny and Jerry.";

// beach, ocean, island, ending
var currentSetting = "beach";

function setup() {
	createCanvas(windowWidth, windowHeight);
	jerryY = height * 2/3;
	jennyY = height * 2/3;
}

function draw() {

	if (currentSetting == "beach") {
		beach();
	} else if (currentSetting == "ocean") {
		ocean();
	} else if (currentSetting == "island") {
		island();
	} else if (currentSetting == "ending") {
		beach();
	}

	// draw characters
	imageMode(CENTER);
	image(jerry, jerryX, jerryY);
	image(jenny, jennyX, jennyY);

	// narration
	fill('black');
	textSize(30);
	textAlign(CENTER, CENTER);
	text(story, width/4, 20, width/2);

	// instructions
	textSize(18);
	fill('white');
	// text("Click to go to the next scene", width - 100, height - 70, 100);
	text("Right arrow to advance story", width - 100, height - 70, 100);
}

function beach() {
	background('lightblue');
	fill('SANDYBROWN');
	noStroke();
	rect(0, height * 2/3, width, height * 1/3);
}

function ocean() {
	background('lightblue');

	// water
	fill('darkblue');
	noStroke();
	rect(0, height * 2/3, width, height * 1/3);

	// fish
	image(fish, 100, height - 90);
	image(fish, 130, height - 120);
	image(fish, 70, height - 150);
}

function island() {
	background('lightblue');

	// water
	fill('darkblue');
	noStroke();
	rect(0, height * 2/3, width, height * 1/3);

	// island
	imageMode(CENTER);
	image(islandImage, width/2, height * 2/3);
}

function mousePressed() {
	// change scene 
	// scene order: beach, ocean, island
	if (currentSetting == "beach") {

		// change setting
		currentSetting = "ocean";

		// update story
		story = "Jerry and Jenny decided to swim across the ocean.";

		// update characters position
		jerryX = 400;
		jennyX = 500;

	} else if (currentSetting == "ocean") {
		currentSetting = "island";
		story = "Jerry and Jenny arrived at an island in the middle of the ocean.";

		jennyX = 600;

	} else if (currentSetting == "island") {
		currentSetting = "ending";

		story = "Then end.";
		jerryX = width - 100;
		jennyX = width - 200;
		
		
	} else if (currentSetting == "ending") {
		
		// back to the beginning 
		currentSetting = "beach";
		
		story = "Once upon a time, there were two characters named Jenny and Jerry.";

		jerryX = 100;
		jennyX = 300;
	}
}

function keyPressed() {
	
	// test the keycode 
	if (keyCode == 39) {
		// change scene 
		// scene order: beach, ocean, island
		if (currentSetting == "beach") {

			// change setting
			currentSetting = "ocean";

			// update story
			story = "Jerry and Jenny decided to swim across the ocean.";

			// update characters position
			jerryX = 400;
			jennyX = 500;

		} else if (currentSetting == "ocean") {
			currentSetting = "island";
			story = "Jerry and Jenny arrived at an island in the middle of the ocean.";

			jennyX = 600;

		} else if (currentSetting == "island") {
			currentSetting = "beach";
			story = "Once upon a time, there were two characters named Jenny and Jerry.";

			jerryX = 100;
			jennyX = 300;
		}
	}
}