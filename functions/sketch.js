/*
	final story sketch
	2.10.2020
*/

var jerryImage;
var jennyImage;
var islandImage;
var fish;

function preload() {
	jerryImage = loadImage('jerry.png');
	jennyImage = loadImage('jenny.png');
	islandImage = loadImage('island.png');
	fish = loadImage('fish.png');
}

// beach, ocean, island, ending
var currentSetting = "beach";

function setup() {
	createCanvas(windowWidth, windowHeight);
	imageMode(CENTER);
}

function draw() {

	if (currentSetting == "beach") {
		
		beach();
		jerry(100, height * 2/3);
		jenny(300, height * 2/3);
		narration("Once upon a time, there were two characters named Jenny and Jerry.");



	} else if (currentSetting == "ocean") {
		
		ocean();
		jerry(400, height * 2/3);
		jenny(500, height * 2/3);
		narration("Jerry and Jenny decided to swim across the ocean.");

	} else if (currentSetting == "island") {
		
		island();
		jerry(400, height * 2/3);
		jenny(600, height * 2/3);
		narration("Jerry and Jenny arrived at an island in the middle of the ocean.");
	
	} else if (currentSetting == "ending") {
		
		beach();
		jerry(width - 100, height * 2/3);
		jenny(width - 200, height * 2/3);
		narration("The end.");
	}

	instructions();
}


/* character functions */
function jerry(x, y) {
	image(jerryImage, x, y);
}

function jenny(x, y) {
	image(jennyImage, x, y);
}

/* narration function */
function narration(story) {
	fill('black');
	textSize(30);
	textAlign(CENTER, CENTER);
	text(story, width/4, 20, width/2);
}

function instructions() {
	textSize(18);
	fill('white');
	// text("Click to go to the next scene", width - 100, height - 70, 100);
	text("Right arrow to advance story", width - 100, height - 70, 100);
}

/* settings functions */
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
	image(islandImage, width/2, height * 2/3);
}

function mousePressed() {
	// change scene 
	// scene order: beach, ocean, island
	if (currentSetting == "beach") {
		currentSetting = "ocean";
	} else if (currentSetting == "ocean") {
		currentSetting = "island";
	} else if (currentSetting == "island") {
		currentSetting = "ending";
	} else if (currentSetting == "ending") {
		currentSetting = "beach";
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
		} else if (currentSetting == "ocean") {
			currentSetting = "island";
		} else if (currentSetting == "island") {
			currentSetting = "beach";
		}
	}
}