/*
	user interface
	3.24.2020
*/

var cloudImage, treeImage, fishImage;

function preload() {
	cloudImage = loadImage("cloud.png");
	treeImage = loadImage("tree.png");
	fishImage = loadImage("fish.png");
}

// global values
var clouds = []; // empty array/list
var numClouds = 5;

var trees = [];
var numTrees = 2;

var fish = [];
var numFish = 10;

// interface values
var skyHue = 195;
var hueSlider;

var fishMinSpeed = 2;
var fishMaxSpeed = 4;
var fishSpeedSlider;

var beachY;
var beachSlider;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();

	beachY = height/2;

	// create our things

	for (let i = 0; i < numClouds; i++) {
		let x = random(width);
		let y = random(height/2);
		let cloud = new Cloud(x, y, cloudImage);
		clouds.push(cloud);
	}

	for (let i = 0; i < numTrees; i++) {
		let x = random(width);
		let y = random(height/3, beachY);
		let tree = new Thing(x, y, treeImage);
		trees.push(tree);
	}

	for (let i = 0; i < numFish; i++) {
		let x = random(width);
		let y = random(height * 2/3, height);
		let f = new Fish(x, y, fishImage);
		fish.push(f);
	}

	var hueLabel = createElement("label", "Change the sky");
	hueLabel.position(10, 10);

	// user interface
	hueSlider = createSlider(10, skyHue, skyHue);
	hueSlider.position(10, 30);
	hueSlider.input(updateHue);

	var fishSpeedLabel = createElement("label", "Change fish speed");
	fishSpeedLabel.position(180, 10);

	fishSpeedSlider = createSlider(1, 10, fishMinSpeed);
	fishSpeedSlider.position(180, 30);
	fishSpeedSlider.input(updateFishSpeed);

	

	var beachLabel = createElement("label", "Beach");
	beachLabel.position(360, 10);

	beachSlider = createSlider(100, beachY, beachY);
	beachSlider.position(360, 30);
	beachSlider.input(updateBeach);
}

function updateHue() {
	skyHue = hueSlider.value();
}

function updateFishSpeed() {
	fishMinSpeed = fishSpeedSlider.value();
	fishMaxSpeed = fishMinSpeed * 2;

	for (let i = 0; i < numFish; i++) {
		fish[i].xSpeed = random(fishMinSpeed, fishMaxSpeed);
	}
}

function updateBeach() {
	beachY = beachSlider.value();

	for (let i = 0; i < numTrees; i++) {
		trees[i].y = random(height/3, beachY);
	}
}

function draw() {
	// sky
	// lightblue 195, 53%, 79%
	colorMode(HSB, 360, 100, 100);
	background(skyHue, 53, 79);

	// beach
	fill('BLANCHEDALMOND');
	rect(0, beachY, width, height);

	// ocean
	fill('MIDNIGHTBLUE');
	rect(0, height * 2/3, width, height/3);


	// draw trees
	for (let i = 0; i < numTrees; i++) {
		trees[i].draw();
	}

	// draw fish
	for (let i = 0; i < numFish; i++) {
		fish[i].draw();
		fish[i].update();
	}

	// draw clouds
	for (let i = 0; i < numClouds; i++) {
		clouds[i].draw();
		clouds[i].update();
	}
}