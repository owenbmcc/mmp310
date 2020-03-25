/*
	dom example
	3.24.2020
*/

var numCircles = 10;
var slider;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noStroke();
	pattern();

	var button = createButton("Generate Pattern");
	button.position(10, 10);
	button.mousePressed(pattern);

	var saveButton = createButton("Save Image");
	saveButton.position(180, 10);
	saveButton.mousePressed(saveImage);

	var label = createElement("label", "Update Circles: ");
	label.position(10, 80);

	slider = createSlider(5, 100, numCircles);
	slider.position(140, 80);
	slider.input(updateCircleNumber);
}

function saveImage() {
	save("pattern.png");
}

function updateCircleNumber() {
	numCircles = slider.value();
	pattern();
}

function pattern() {
	background('plum');

	for (let i = 0; i < numCircles; i++) {
		let x = i * width/numCircles + random(50);
		let y = random(height);
		let s = random(100, 200);

		fill('gold');
		ellipse(x, y, s);
	}
}