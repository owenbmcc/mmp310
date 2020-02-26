/*
	loop example + random
	for a setting
	2.26.2020
*/

var fishImage, cloudImage, treeImage;

function preload() {
	fishImage = loadImage('fish.png');
	cloudImage = loadImage('cloud.png');
	treeImage = loadImage('tree.png');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	setting();
}

function mousePressed() {
	setting();
}

function setting() {
	// background colors
	background('lightblue');

	noStroke();
	fill('sandybrown');
	rect(0, height/2, width, height/2);

	fill('darkblue');
	rect(0, height * 2/3, width, height/3);

	// images

	// trees
	for (let x = 100; x <= width; x += 400) {
		image(treeImage, random(width), height/2 - 150 + x/20);
	}

	// fish
	for (let x = -50; x <= width; x += 100) {
		image(fishImage, x, height - random(200));
		image(fishImage, x + random(50), height - random(250));
		image(fishImage, x, height - random(200));
	}

	// clouds
	for (let x = -50; x <= width; x += 200) {
		let y = random(height/3);
		let offset = random(-100, 100);
		image(cloudImage, x + offset, y);

		// image(cloudImage, random(width), random(height));
	}

}