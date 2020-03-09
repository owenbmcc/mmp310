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

// deal with later
// var fishSpeedX = [];
// var fishSpeedY = [];

function setup() {
	createCanvas(windowWidth, windowHeight);

	// add cloud positions
	let x = -50;
	for (let i = 0; i < numClouds; i++) {
		let y = random(height/3);

		let cloud = new Thing(x, y, cloudImage);
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
		let x = random(width);
		let y = height - fishImage.height - random(100);
		
		let fish = new Thing(x, y, fishImage);
		fishes.push(fish);

		// fishSpeedX.push(random(1,3));
		// fishSpeedY.push(random(-2, 2));
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

		/*
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
		*/
	}



	// draw clouds
	for (let i = 0; i < numClouds; i++) {
		clouds[i].draw();

		/*
		// animate x
		cloudX[i] += 1;

		// check if cloud is beyond right side of canvas
		if (cloudX[i] > width) {
			// reset cloud back to left side
			cloudX[i] = -cloudImage.width;
		}
		*/
	}

}
