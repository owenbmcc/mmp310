/*
	new class example
	3.19.2020
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

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();

	// create our things

	for (let i = 0; i < numClouds; i++) {
		let x = random(width);
		let y = random(height/2);
		let cloud = new Cloud(x, y, cloudImage);
		clouds.push(cloud);
	}

	for (let i = 0; i < numTrees; i++) {
		let x = random(width);
		let y = random(height/3, height/2);
		let tree = new Thing(x, y, treeImage);
		trees.push(tree);
	}

	for (let i = 0; i < numFish; i++) {
		let x = random(width);
		let y = random(height * 2/3, height);
		let f = new Fish(x, y, fishImage);
		fish.push(f);
	}

}

function draw() {
	// sky
	background('lightblue');

	// beach
	fill('BLANCHEDALMOND');
	rect(0, height/2, width, height/2);

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