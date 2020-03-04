/*
	array example
	3.2.2020
*/

var fishImage, cloudImage, treeImage;
function preload() {
	fishImage = loadImage('fish.png');
	cloudImage = loadImage('cloud.png');
	treeImage = loadImage('tree.png');
}

/* position variables for images */
var cloudX = []; // empty array
var cloudY = [];
var numClouds = 7;

var numTrees = 3;
var treeX = [];
var treeY = [];

var numFish = 20;
var fishX = [];
var fishY = [];
var fishSpeedX = [];
var fishSpeedY = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	// add cloud positions
	let x = -50;
	for (let i = 0; i < numClouds; i++) {
		cloudX.push( x );
		// update x, distributing number of clouds across canvas
		x += width/numClouds + random(-100, 100);
		cloudY.push( random(height/3) );
	}

	// add tree positions
	let y = 250;
	for (let i = 0; i < numTrees; i++) {
		treeX.push(random(treeImage.width, width - treeImage.width));
		treeY.push(y);
		y += 30;
	}

	// add fish positions 
	for (let i = 0; i < numFish; i++) {
		fishX.push(random(width));
		fishY.push(height - fishImage.height - random(100));
		fishSpeedX.push(random(1,3));
		fishSpeedY.push(random(-2, 2));
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
		image(treeImage, treeX[i], treeY[i]);
	}

	// fish
	for (let i = 0; i < numFish; i++) {
		image(fishImage, fishX[i], fishY[i]);

		// animate
		fishX[i] += fishSpeedX[i] + random(1);
		fishY[i] += fishSpeedY[i] + random(-0.5, 0.5);

		// reset fish
		if (fishX[i] > width) {
			fishX[i] = -fishImage.width;
		}

		// contain y value of fish
		if (fishY[i] < height * 2/3 || 
			fishY[i] > height - fishImage.height) {
			fishSpeedY[i] *= -1;
		}
	}



	// draw clouds
	for (let i = 0; i < numClouds; i++) {
		image(cloudImage, cloudX[i], cloudY[i]);

		// animate x
		cloudX[i] += 1;

		// check if cloud is beyond right side of canvas
		if (cloudX[i] > width) {
			// reset cloud back to left side
			cloudX[i] = -cloudImage.width;
		}
	}

}
