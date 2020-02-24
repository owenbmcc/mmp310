/*
	loop example
	for a setting
	2.24.2020
*/

var fishImage, cloudImage, treeImage;

function preload() {
	fishImage = loadImage('fish.png');
	cloudImage = loadImage('cloud.png');
	treeImage = loadImage('tree.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
}

function draw() {
	// background colors
	background('lightblue');

	noStroke();
	fill('sandybrown');
	rect(0, height/2, width, height/2);

	fill('darkblue');
	rect(0, height * 2/3, width, height/3);

	// images
	
	// clouds
	for (let x = -50; x <= width; x += 200) {
		image(cloudImage, x, 50 - x/10);
		image(cloudImage, x, 200 - x/10);
	}

	// trees
	for (let x = 100; x <= width; x += 400) {
		image(treeImage, x, height/2 - 150 + x/20);
	}

	// fish
	for (let x = -50; x <= width; x += 100) {
		image(fishImage, x, height - 100);
		image(fishImage, x + 50, height - 150);
		image(fishImage, x, height - 200);
	}

}