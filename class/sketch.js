/*
	class example
	3.9.2020
*/

var fishImage, cloudImage, treeImage;
function preload() {
	fishImage = loadImage('fish.png');
	cloudImage = loadImage('cloud.png');
	treeImage = loadImage('tree.png');
}

var clouds = []; // empty array 
var numClouds = 7;

var numTrees = 3;
var trees = [];

var numFish = 20;
var fishes = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	// add cloud positions
	let x = -50;
	for (let i = 0; i < numClouds; i++) {
		let y = random(height/3);

		let cloud = new Cloud(x, y, cloudImage);
		clouds.push(cloud);
		
		// update x, distributing number of clouds across canvas
		x += width/numClouds + random(-100, 100);
	}

	// add tree positions
	let y = 250;
	for (let i = 0; i < numTrees; i++) {
		
		let x = random(treeImage.width, width - treeImage.width);
		
		let tree = new Thing(x, y, treeImage);
		trees.push(tree);

		y += 30;
	}

	// add fish positions 
	for (let i = 0; i < numFish; i++) {
		let fish = new Fish(fishImage);
		fishes.push(fish);
	}
}

function draw() {
	background('lightblue');

	// beach color
	noStroke();
	fill('sandybrown');
	rect(0, height/2, width, height/2);

	// ocean 
	fill('darkblue');
	rect(0, height * 2/3, width, height/3);

	// trees
	for (let i = 0; i < numTrees; i++) {
		trees[i].draw();
	}

	// fish
	for (let i = 0; i < numFish; i++) {
		fishes[i].draw();
		fishes[i].update();
	}

	// draw clouds
	for (let i = 0; i < numClouds; i++) {
		clouds[i].draw();
		clouds[i].update();
	}

}
